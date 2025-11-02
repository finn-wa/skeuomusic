import {
  type CurrentlyPlayingContextObject,
  type PlayerApi,
  type SpotifyAuth,
  spotifyPlayerApi,
  type TrackObject,
} from "spotify-api-client";
import type {
  PlayerAction,
  PlayerActionKind,
  PlayerActions,
} from "../player-actions";
import type { PlayerClient } from "../player-client";
import type { PlayerState, Repeat } from "../player-store";

export async function getSpotifyPlayerState(
  playerApi: PlayerApi,
): Promise<
  { success: true; state: PlayerState } | { success: false; error: unknown }
> {
  let spotifyState: CurrentlyPlayingContextObject | null | undefined;
  try {
    spotifyState = await playerApi.getInformationAboutTheUsersCurrentPlayback();
  } catch (error) {
    return { success: false, error };
  }
  if (spotifyState == null || spotifyState.currently_playing_type !== "track") {
    return {
      success: true,
      state: {
        playing: false,
        repeat: "off",
        shuffle: false,
        volume: 50,
      },
    };
  }
  const currentTrack = spotifyState.item as TrackObject;
  const song: PlayerState["song"] = {
    id: currentTrack.id!,
    uri: currentTrack.uri!,
    durationMs: currentTrack.duration_ms!,
    name: currentTrack.name!,
    album: currentTrack.album!,
    artists:
      currentTrack.artists == null
        ? []
        : currentTrack.artists.filter(
            (artist): artist is { name: string } => artist.name != null,
          ),
  };
  const state: PlayerState = {
    playedAt: { epochMs: Date.now(), trackMs: spotifyState.progress_ms ?? 0 },
    playing: spotifyState.is_playing ?? false,
    repeat: spotifyState.repeat_state as Repeat,
    shuffle: spotifyState.shuffle_state ?? false,
    song,
    track: {
      current: currentTrack.track_number ?? 0,
      total: currentTrack.album?.total_tracks ?? 0,
    },
    volume: spotifyState.device?.volume_percent ?? 50,
  };
  return { success: true, state };
}

type EffectActionKind = Exclude<
  PlayerActionKind,
  "requestSync" | "syncExternalState"
>;

type SpotifyPlayerEffect<K extends EffectActionKind> = (
  playerApi: PlayerApi,
  action: PlayerActions[K],
) => Promise<void>;

export const SpotifyPlayerEffects: {
  [K in EffectActionKind]: SpotifyPlayerEffect<K>;
} = {
  play: async (playerApi) => playerApi.startAUsersPlayback(),
  pause: async (playerApi) => playerApi.pauseAUsersPlayback(),
  setSong: async (playerApi, action) => {
    if (action.song == null) {
      return;
    }
    await playerApi.startAUsersPlayback({
      startAUsersPlaybackRequest: { contextUri: action.song.uri },
    });
  },
  setVolume: async (playerApi, { volume }) => {
    await playerApi.setVolumeForUsersPlayback({ volumePercent: volume });
  },
  seek: async (playerApi, { positionMs }) => {
    await playerApi.seekToPositionInCurrentlyPlayingTrack({ positionMs });
  },
  next: async (playerApi) => {
    await playerApi.skipUsersPlaybackToNextTrack();
  },
  previous: async (playerApi) => {
    await playerApi.skipUsersPlaybackToPreviousTrack();
  },
  setRepeat: async (playerApi, { repeat }) => {
    await playerApi.setRepeatModeOnUsersPlayback({ state: repeat });
  },
  setShuffle: async (playerApi, { shuffle }) => {
    await playerApi.toggleShuffleForUsersPlayback({ state: shuffle });
  },
};

export function createSpotifyPlayerClient(
  getSpotifyAuth: () => SpotifyAuth | undefined,
  setState: (state: PlayerState) => void,
): PlayerClient {
  return {
    applyAction: async <T extends PlayerAction>(action: T) => {
      const spotifyAuth = getSpotifyAuth();
      if (spotifyAuth == null) {
        throw new Error("spotifyAuth is undefined");
      }
      if (action.kind === "syncExternalState") {
        return { success: true };
      }
      const playerApi = spotifyPlayerApi(spotifyAuth);
      if (action.kind === "requestSync") {
        const result = await getSpotifyPlayerState(playerApi);
        if (result.success) {
          setState(result.state);
          return { success: true };
        }
        console.error("Error getting Spotify playback state");
        return result;
      }
      try {
        const actionEffect = SpotifyPlayerEffects[action.kind] as (
          playerApi: PlayerApi,
          action: T,
        ) => Promise<void>;
        await actionEffect(playerApi, action);
      } catch (error) {
        console.error("Error in SpotifyPlayerClient");
        return { success: false, error };
      }
      return { success: true };
    },
  };
}

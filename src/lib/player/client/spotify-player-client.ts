import type { PlaybackState, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import type {
  PlayerAction,
  PlayerActionKind,
  PlayerActions,
} from "../player-actions";
import type { PlayerClient } from "../player-client";
import type { PlayerState, Repeat } from "../player-store";

export async function getSpotifyPlayerState(
  playerApi: SpotifyApi["player"],
): Promise<
  { success: true; state: PlayerState } | { success: false; error: unknown }
> {
  let spotifyState: PlaybackState;
  try {
    spotifyState = await playerApi.getPlaybackState();
  } catch (error) {
    return { success: false, error };
  }
  if (spotifyState == null) {
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
  const state: PlayerState = {
    playedAt: { epochMs: Date.now(), trackMs: spotifyState.progress_ms },
    playing: spotifyState.is_playing,
    repeat: spotifyState.repeat_state as Repeat,
    shuffle: spotifyState.shuffle_state,
    // TODO: could be episode
    song: {
      ...(spotifyState.item as Track),
      durationMs: spotifyState.item.duration_ms,
    },
    track: {
      current: (spotifyState.item as Track).track_number,
      total: (spotifyState.item as Track).album.total_tracks,
    },
    volume: spotifyState.device.volume_percent ?? 50,
  };
  return { success: true, state };
}

type EffectActionKind = Exclude<
  PlayerActionKind,
  "requestSync" | "syncExternalState"
>;

type SpotifyPlayerEffect<K extends EffectActionKind> = (
  playerApi: SpotifyApi["player"],
  action: PlayerActions[K],
) => Promise<void>;

async function ignoreParseError(request: () => Promise<void>): Promise<void> {
  try {
    await request();
  } catch (error) {
    if (Error.isError(error) && error.message.includes("JSON.parse")) {
      // SDK expects JSON but API returns a plain string
      return;
    }
    throw error;
  }
}

export const SpotifyPlayerEffects: {
  [K in EffectActionKind]: SpotifyPlayerEffect<K>;
} = {
  play: async (playerApi) => {
    await ignoreParseError(() => playerApi.startResumePlayback(""));
  },
  pause: async (playerApi) => {
    await ignoreParseError(() => playerApi.pausePlayback(""));
  },
  setSong: async (playerApi, action) => {
    if (action.song == null) {
      return;
    }
    await playerApi.addItemToPlaybackQueue(action.song.uri);
    await playerApi.skipToNext("");
  },
  setVolume: async (playerApi, { volume }) => {
    await playerApi.setPlaybackVolume(volume);
  },
  seek: async (playerApi, { positionMs }) => {
    await playerApi.seekToPosition(positionMs);
  },
  next: async (playerApi) => {
    await playerApi.skipToNext("");
  },
  previous: async (playerApi) => {
    await playerApi.skipToPrevious("");
  },
  setRepeat: async (playerApi, { repeat }) => {
    await playerApi.setRepeatMode(repeat);
  },
  setShuffle: async (playerApi, { shuffle }) => {
    await playerApi.togglePlaybackShuffle(shuffle);
  },
};

export function createSpotifyPlayerClient(
  api: () => SpotifyApi | undefined,
  setState: (state: PlayerState) => void,
): PlayerClient {
  return {
    applyAction: async <T extends PlayerAction>(action: T) => {
      const spotify = api();
      if (spotify == null) {
        throw new Error("spotify API is undefined");
      }
      if (action.kind === "requestSync") {
        const result = await getSpotifyPlayerState(spotify.player);
        if (result.success) {
          setState(result.state);
          return { success: true };
        }
        console.error("Error getting Spotify playback state");
        return result;
      }
      if (action.kind === "syncExternalState") {
        return { success: true };
      }
      try {
        const actionEffect = SpotifyPlayerEffects[action.kind] as (
          playerApi: SpotifyApi["player"],
          action: T,
        ) => Promise<void>;
        await actionEffect(spotify.player, action);
      } catch (error) {
        console.error("Error in SpotifyPlayerClient");
        return { success: false, error };
      }
      return { success: true };
    },
  };
}

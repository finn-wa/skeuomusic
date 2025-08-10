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
): Promise<Partial<PlayerState>> {
  let spotifyState: PlaybackState;
  try {
    spotifyState = await playerApi.getPlaybackState();
  } catch (error) {
    console.error("Error getting Spotify playback state", error);
    return {};
  }
  if (spotifyState == null) {
    // TODO: handle nothing playing state
    return {
      playing: false,
    };
  }
  return {
    playedAt: { epochMs: Date.now(), trackMs: spotifyState.progress_ms },
    playing: spotifyState.is_playing,
    repeat: spotifyState.repeat_state as Repeat,
    shuffle: spotifyState.shuffle_state,
    // TODO: could be episode
    song: spotifyState.item as Track,
    track: {
      current: (spotifyState.item as Track).track_number,
      total: (spotifyState.item as Track).album.total_tracks,
    },
    volume: spotifyState.device.volume_percent ?? 50,
  } satisfies PlayerState;
}

type SpotifyPlayerActionKind = Exclude<
  PlayerActionKind,
  "requestSync" | "syncExternalState"
>;

type PlayerStateActionHandler<K extends SpotifyPlayerActionKind> = (
  playerApi: SpotifyApi["player"],
  action: PlayerActions[K],
) => Promise<void>;

export const SpotifyActionHandlers: {
  [K in SpotifyPlayerActionKind]: PlayerStateActionHandler<K>;
} = {
  play: async (playerApi) => {
    await playerApi.startResumePlayback("");
  },
  pause: async (playerApi) => {
    await playerApi.pausePlayback("");
  },
  setSong: async (playerApi, action) => {
    await playerApi.addItemToPlaybackQueue(action.song.uri);
    await playerApi.skipToNext("");
  },
  setVolume: async (playerApi, action) => {
    await playerApi.setPlaybackVolume(action.volume);
  },
  next: async (playerApi) => {
    await playerApi.skipToNext("");
  },
  previous: async (playerApi) => {
    await playerApi.skipToPrevious("");
  },
  setRepeat: async (playerApi, action) => {
    await playerApi.setRepeatMode(action.repeat);
  },
  setShuffle: async (playerApi, action) => {
    await playerApi.togglePlaybackShuffle(action.shuffle);
  },
};

export function createSpotifyPlayerClient(
  api: SpotifyApi,
  patchLocalState: (state: Partial<PlayerState>) => void,
): PlayerClient {
  const onDispatch = async <T extends PlayerAction>(action: T) => {
    if (action.kind === "syncExternalState") {
      return;
    }
    try {
      if (action.kind === "requestSync") {
        const playerState = await getSpotifyPlayerState(api.player);
        return patchLocalState(playerState);
      }
      const actionHandler = SpotifyActionHandlers[action.kind] as (
        playerApi: SpotifyApi["player"],
        action: T,
      ) => Promise<void>;
      await actionHandler(api.player, action);
    } catch (error) {
      console.error("Error in SpotifyPlayerClient", error);
    }
  };
  return { onDispatch };
}

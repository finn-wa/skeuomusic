import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type { PlayerClient } from "../player-client";

export function createSpotifyPlayerClient(api: SpotifyApi): PlayerClient {
  return {
    loadTrack: (uri) => api.player.addItemToPlaybackQueue(uri),
    pause: () => api.player.pausePlayback(""),
    play: () => api.player.startResumePlayback(""),
  };
}

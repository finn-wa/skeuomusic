import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { createSignal, onCleanup, onMount } from "solid-js";
import {
  initSpotifyPlayer,
  type SpotifyPlayer,
  spotifyAlbumsApi,
  spotifyArtistsApi,
  spotifyPlayerApi,
  spotifyPlaylistsApi,
  spotifyTracksApi,
} from "spotify-api-client";
import { useAuthContext } from "~/lib/client/auth-context";
import { MusicContext } from "~/lib/client/music-context";
import { createSpotifyPlayerClient } from "~/lib/client/player/client/spotify-player-client";
import { createPlayerStore } from "~/lib/client/player/player-store";
import { SECS_MS } from "~/lib/constants";

export const Route = createFileRoute("/music")({
  component: Music,
});

/**
 * Validates context for /music routes. There is probably a more idomatic way
 * to do this.
 * TODO: this should be a layout-only route, prevent navigation to /music
 * or it should just be a guard of some kind
 */
export default function Music() {
  const { spotifyAuth } = useAuthContext();
  const requiredSpotifyAuth = () => {
    const auth = spotifyAuth();
    if (auth == null) {
      throw new Error("Spotify auth required but not present");
    }
    return auth;
  };

  const playerStore = createPlayerStore((patchLocalState) =>
    createSpotifyPlayerClient(spotifyAuth, patchLocalState),
  );

  let spotifyPlayer: SpotifyPlayer | undefined;
  const spotifyPlayerAccessor = () => {
    if (spotifyPlayer == null) {
      const SpotifyPlayer = initSpotifyPlayer(window);
      spotifyPlayer = new SpotifyPlayer({
        name: "skeuomusic",
        getOAuthToken: (provideToken) => {
          return requiredSpotifyAuth()
            .getAccessToken()
            .then((token) => {
              provideToken(token!.access_token);
            });
        },
        enableMediaSession: true,
      });
    }
    return spotifyPlayer;
  };

  const musicContext: MusicContext = {
    playerStore,
    spotify: {
      player: spotifyPlayerAccessor,
      api: {
        albums: () => spotifyAlbumsApi(requiredSpotifyAuth()),
        artists: () => spotifyArtistsApi(requiredSpotifyAuth()),
        player: () => spotifyPlayerApi(requiredSpotifyAuth()),
        playlists: () => spotifyPlaylistsApi(requiredSpotifyAuth()),
        tracks: () => spotifyTracksApi(requiredSpotifyAuth()),
      },
    },
  };
  const [syncInterval, setSyncInterval] = createSignal<number | undefined>();
  const clearSyncInterval = () => {
    const intervalRef = syncInterval();
    if (intervalRef == null) {
      return;
    }
    clearInterval(intervalRef);
    setSyncInterval(undefined);
  };
  onMount(() => {
    const requestSync = () =>
      playerStore.dispatch(playerStore.action.requestSync());
    requestSync();

    clearSyncInterval();
    const newSyncInterval = setInterval(requestSync, 10 * SECS_MS);
    setSyncInterval(newSyncInterval as unknown as number);
    onCleanup(() => clearSyncInterval());
  });

  return (
    <MusicContext.Provider value={musicContext}>
      <Outlet />
    </MusicContext.Provider>
  );
}

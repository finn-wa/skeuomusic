import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { createSignal, onCleanup, onMount } from "solid-js";
import {
  type SpotifyPlayer,
  spotifyAlbumsApi,
  spotifyArtistsApi,
  spotifyPlayerApi,
  spotifyPlaylistsApi,
  spotifyTracksApi,
} from "spotify-api-client";
import { useAuthContext } from "~/lib/client/auth-context";
import { MusicContext } from "~/lib/client/music-context";
import { createSpotifyPlayerAdapter } from "~/lib/client/player/adapter/spotify-player-adapter";
import { createPlayerStore } from "~/lib/client/player/store/player-store";
import { SECS_MS } from "~/lib/constants";

export const Route = createFileRoute("/music")({
  component: Music,
});

/** Layout route that provides MusicContext */
export default function Music() {
  const authContext = useAuthContext();
  const requiredSpotifyAuth = authContext.requiredSpotifyAuth;

  const playerStore = createPlayerStore();
  const [spotifyPlayer, setSpotifyPlayer] = createSignal<
    SpotifyPlayer | undefined
  >();

  const musicContext: MusicContext = {
    playerStore,
    spotify: {
      webPlayer: spotifyPlayer,
      setWebPlayer: setSpotifyPlayer,
      api: {
        albums: () => spotifyAlbumsApi(requiredSpotifyAuth()),
        artists: () => spotifyArtistsApi(requiredSpotifyAuth()),
        player: () => spotifyPlayerApi(requiredSpotifyAuth()),
        playlists: () => spotifyPlaylistsApi(requiredSpotifyAuth()),
        tracks: () => spotifyTracksApi(requiredSpotifyAuth()),
      },
    },
  };
  const spotifyPlayerAdapter = createSpotifyPlayerAdapter(
    authContext,
    musicContext,
  );
  playerStore.listeners.add(spotifyPlayerAdapter);

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

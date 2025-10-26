import { createFileRoute, Outlet, useNavigate } from "@tanstack/solid-router";
import { createSignal, onCleanup, onMount } from "solid-js";
import { useAuthContext } from "~/lib/client/auth-context";
import { SECS_MS } from "~/lib/constants";
import { createSpotifyPlayerClient } from "~/lib/player/client/spotify-player-client";
import { PlayerContext } from "~/lib/player/player-context";
import { createPlayerStore } from "~/lib/player/player-store";

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
  const navigate = useNavigate();
  const authCtx = useAuthContext();
  const playerStore = createPlayerStore((patchLocalState) =>
    createSpotifyPlayerClient(authCtx.spotifyAuth, patchLocalState),
  );
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

  onMount(() => {
    if (authCtx?.spotifyAuth() == null) {
      // TODO: handle re-auth without redirect
      navigate({ to: "/redirect/spotify" });
    }
  });
  return (
    <PlayerContext.Provider value={playerStore}>
      <Outlet />
    </PlayerContext.Provider>
  );
}

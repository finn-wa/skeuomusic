import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, onMount } from "solid-js";
import { Player } from "~/components/player/Player";
import { useMusicContext } from "~/lib/client/music-context";
import { SECS_MS } from "~/lib/constants";
import { createSpotifyPlayerClient } from "~/lib/player/client/spotify-player-client";
import { PlayerContext } from "~/lib/player/player-context";
import { createPlayerStore } from "~/lib/player/player-store";

export const Route = createFileRoute("/music/player/")({
  component: PlayerRouteComponent,
});

function PlayerRouteComponent() {
  const musicCtx = useMusicContext();
  const playerCtx = createPlayerStore((patchLocalState) =>
    createSpotifyPlayerClient(musicCtx.spotify()!, patchLocalState),
  );
  const [syncInterval, setSyncInterval] = createSignal<number | undefined>();

  onMount(() => {
    const requestSync = () =>
      playerCtx.dispatch(playerCtx.action.requestSync());
    requestSync();

    clearInterval(syncInterval());
    const newSyncInterval = setInterval(requestSync, 10 * SECS_MS);
    setSyncInterval(newSyncInterval as unknown as number);
  });

  return (
    <PlayerContext.Provider value={playerCtx}>
      <Player />
    </PlayerContext.Provider>
  );
}

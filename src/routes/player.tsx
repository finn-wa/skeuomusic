import { Outlet, createFileRoute, useNavigate } from "@tanstack/solid-router";
import { onMount, useContext } from "solid-js";
import Header from "~/components/header/Header";
import NavTab from "~/components/nav-tab/NavTab";
import { PlayerContext } from "~/lib/client/player-context";

export const Route = createFileRoute("/player")({
  component: Player,
});

/**
 * Provides header and nav tab bar for /player routes
 */
export default function Player() {
  const navigate = useNavigate({ from: "/player" });
  const context = useContext(PlayerContext);
  onMount(() => {
    if (context?.spotify() == null) {
      // TODO: handle re-auth without redirect
      navigate({ to: "/redirect/spotify" });
    }
  });
  return (
    <>
      <Header />
      <div class="content-frame">
        <Outlet />
      </div>
      <nav class="bar">
        <NavTab route="/player/playlists" label="Playlists" />
        <NavTab route="/player/artists" label="Artists" />
        <NavTab route="/player/songs" label="Songs" />
        <NavTab route="/player/albums" label="Albums" />
        <NavTab route="/player/more" label="More" />
      </nav>
    </>
  );
}

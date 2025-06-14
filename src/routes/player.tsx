import { Outlet, createFileRoute } from "@tanstack/solid-router";
import Header from "~/components/header/Header";
import NavTab from "~/components/nav-tab/NavTab";

export const Route = createFileRoute("/player")({
  component: Player,
});

/**
 * Provides header and nav tab bar for /player routes
 */
export default function Player() {
  return (
    <div class="page">
      <Header />
      <div class="content">
        <Outlet />
      </div>
      <nav class="bar">
        <NavTab route="/player/playlists" label="Playlists" />
        <NavTab route="/player/artists" label="Artists" />
        <NavTab route="/player/songs" label="Songs" />
        <NavTab route="/player/albums" label="Albums" />
        <NavTab route="/player/more" label="More" />
      </nav>
    </div>
  );
}

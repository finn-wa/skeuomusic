import { Outlet, createFileRoute, useNavigate } from "@tanstack/solid-router";
import Header from "~/components/header/Header";
import NavTab from "~/components/nav-tab/NavTab";

export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/**
 * Provides header and nav tab bar for /music/library routes
 */
export default function MusicLibrary() {
  return (
    <>
      <Header />
      <div class="content-frame">
        <Outlet />
      </div>
      <nav class="bar">
        <NavTab route="/music/library/playlists" label="Playlists" />
        <NavTab route="/music/library/artists" label="Artists" />
        <NavTab route="/music/library/songs" label="Songs" />
        <NavTab route="/music/library/albums" label="Albums" />
        <NavTab route="/music/library/more" label="More" />
      </nav>
    </>
  );
}

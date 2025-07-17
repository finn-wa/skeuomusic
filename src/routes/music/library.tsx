import { Outlet, createFileRoute, useNavigate } from "@tanstack/solid-router";
import { onMount, useContext } from "solid-js";
import Header from "~/components/header/Header";
import NavTab from "~/components/nav-tab/NavTab";
import { MusicContext } from "~/lib/client/music-context";
export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/**
 * Provides header and nav tab bar for /music/library routes
 */
export default function MusicLibrary() {
  // TODO: Move back to /music when player is being hooked up
  const navigate = useNavigate();
  const context = useContext(MusicContext);
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
        <NavTab route="/music/library/playlists" label="Playlists" />
        <NavTab route="/music/library/artists" label="Artists" />
        <NavTab route="/music/library/songs" label="Songs" />
        <NavTab route="/music/library/albums" label="Albums" />
        <NavTab route="/music/library/more" label="More" />
      </nav>
    </>
  );
}

import type { RouteSectionProps } from "@solidjs/router";
import Header from "~/components/header/Header";
import NavTab from "~/components/nav-tab/NavTab";

/**
 * Provides header and nav tab bar for /player routes
 */
export default function Player(props: RouteSectionProps) {
  return (
    <div class="page">
      <Header />
      <div class="content">{props.children}</div>
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

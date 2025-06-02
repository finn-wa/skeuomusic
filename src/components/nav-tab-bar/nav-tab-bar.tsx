import { component$ } from "@builder.io/qwik";
import { NavTab } from "../nav-tab/nav-tab";

export const NavTabBar = component$(() => {
  return (
    <nav class="bar">
      <NavTab route="/player/playlists" label="Playlists" />
      <NavTab route="/player/artists" label="Artists" />
      <NavTab route="/player/songs" label="Songs" />
      <NavTab route="/player/albums" label="Albums" />
      <NavTab route="/player/more" label="More" />
    </nav>
  );
});

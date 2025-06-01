import { component$ } from "@builder.io/qwik";
import { NavTab } from "../nav-tab/nav-tab";
import styles from "./nav-tab-bar.module.css";

export const NavTabBar = component$(() => {
  return (
    <nav class={["bar", styles["tab-bar"]]}>
      <NavTab route="/player/playlists">Playlists</NavTab>
      <NavTab route="/player/artists">Artists</NavTab>
      <NavTab route="/player/songs">Songs</NavTab>
      <NavTab route="/player/albums">Albums</NavTab>
      <NavTab route="/player/more">More</NavTab>
    </nav>
  );
});

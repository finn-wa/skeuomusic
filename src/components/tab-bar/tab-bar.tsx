import { component$ } from "@builder.io/qwik";
import { TabButton } from "../tab-button/tab-button";
import styles from "./tab-bar.module.css";

export const TabBar = component$(() => {
  return (
    <div class={["bar", styles["tab-bar"]]}>
      <TabButton route="/player/playlists">Playlists</TabButton>
      <TabButton route="/player/artists">Artists</TabButton>
      <TabButton route="/player/songs">Songs</TabButton>
      <TabButton route="/player/albums">Albums</TabButton>
      <TabButton route="/player/more">More</TabButton>
    </div>
  );
});

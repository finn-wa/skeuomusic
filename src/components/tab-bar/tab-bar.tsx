import { component$ } from "@builder.io/qwik";
import { TabButton } from "../tab-button/tab-button";
import styles from "./tab-bar.module.css";

export const TabBar = component$(() => {
  return (
    <div class={["bar", styles["tab-bar"]]}>
      <TabButton route="/playlists">Playlists</TabButton>
      <TabButton route="/artists">Artists</TabButton>
      <TabButton route="/songs">Songs</TabButton>
      <TabButton route="/albums">Albums</TabButton>
      <TabButton route="/more">More</TabButton>
    </div>
  );
});

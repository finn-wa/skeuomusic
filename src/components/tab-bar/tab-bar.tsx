import { component$, useSignal } from "@builder.io/qwik";
import styles from "./tab-bar.module.css";
import { TabButton } from "../tab-button/tab-button";

export const TabBar = component$(() => {
  return (
    <div class={styles.bar}>
      <TabButton route="/playlists">Playlists</TabButton>
      <TabButton route="/artists">Artists</TabButton>
      <TabButton route="/songs">Songs</TabButton>
      <TabButton route="/albums">Albums</TabButton>
      <TabButton route="/more">More</TabButton>
    </div>
  );
});

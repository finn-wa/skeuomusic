import { Show } from "solid-js";
import { formatArtists } from "~/lib/client/music-utils";
import type { Song } from "~/lib/types";
import NavArrowButton from "../../nav-arrow-button/NavArrowButton";
import styles from "./PlayerHeader.module.css";

export type PlayerHeaderProps = {
  onInfoClick: () => void;
  song: Song | undefined;
};

export function PlayerHeader(props: PlayerHeaderProps) {
  return (
    <header class={`player-header ${styles.header}`}>
      <div class="header-button left">
        <NavArrowButton
          direction="left"
          text="<-"
          kind="player"
          href="/music/library/albums"
        />
      </div>

      <button
        class={styles.info}
        type="button"
        onClick={() => props.onInfoClick()}
        aria-label="Show/hide player controls"
      >
        <h1 class="h4 text-truncate">
          <Show when={props.song != null}>
            <span class={styles["track-subtitle"]}>
              {formatArtists(props.song!.artists)}
            </span>
            <br />
            <span class={styles["track-title"]}>{props.song!.name}</span>
            <br />
            <span class={styles["track-subtitle"]}>
              {props.song!.album.name}
            </span>
          </Show>
        </h1>
      </button>

      <div class="header-button right">
        <NavArrowButton
          direction="right"
          kind="player"
          text={"="}
          href="/music/player/menu"
        />
      </div>
    </header>
  );
}

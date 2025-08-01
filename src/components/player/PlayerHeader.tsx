import NavArrowButton from "../nav-arrow-button/NavArrowButton";
import styles from "./PlayerHeader.module.css";

export type PlayerHeaderProps = {
  onInfoClick: () => void;
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
          <span class={styles["track-subtitle"]}>Artist</span>
          <br />
          <span class={styles["track-title"]}>Song</span>
          <br />
          <span class={styles["track-subtitle"]}>Album</span>
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

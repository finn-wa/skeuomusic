import NavArrowButton from "../nav-arrow-button/NavArrowButton";
import styles from "./PlayerHeader.module.css";

export function PlayerHeader() {
  return (
    <header class={styles.header}>
      <div class="header-button left">
        <NavArrowButton
          direction="left"
          text="<-"
          kind="primary"
          href="/music/player/library"
        />
      </div>

      <h1 class="h4 text-truncate">
        <span class={styles["track-subtitle"]}>Artist</span>
        <br />
        <span class={styles["track-title"]}>Song</span>
        <br />
        <span class={styles["track-subtitle"]}>Album</span>
      </h1>

      <div class="header-button right">
        <NavArrowButton
          direction="right"
          kind="primary"
          text={"="}
          href="/music/player/menu"
        />
      </div>
    </header>
  );
}

import { Show, createSignal } from "solid-js";
import styles from "./PlaybackControlPanel.module.css";

export function PlaybackControlPanel() {
  const [playing, _setPlaying] = createSignal(false);
  return (
    <div class={`panel ${styles.background}`}>
      <fieldset class={styles.controls} aria-label="Playback controls">
        <button
          class={styles["emboss-right"]}
          aria-label="Previous track"
          type="button"
        >
          ⏮️
        </button>
        <button
          class={`${styles["emboss-left"]} ${styles["emboss-right"]}`}
          aria-label={playing() ? "Pause" : "Play"}
          type="button"
        >
          {playing() ? "⏸️" : "▶️"}
        </button>
        <button
          class={styles["emboss-left"]}
          aria-label="Next track"
          type="button"
        >
          ⏭️
        </button>
      </fieldset>
    </div>
  );
}

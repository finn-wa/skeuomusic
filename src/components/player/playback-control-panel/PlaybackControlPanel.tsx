import { createSignal } from "solid-js";
import styles from "./PlaybackControlPanel.module.css";
import {
  PlaybackControlPanelNext,
  PlaybackControlPanelPlayPause,
  PlaybackControlPanelPrev,
} from "./PlaybackControlPanelIcons";

export function PlaybackControlPanel() {
  const [playing, setPlaying] = createSignal(false);
  return (
    <div class={`panel ${styles.background}`}>
      <fieldset class={styles.controls} aria-label="Playback controls">
        <button
          class={styles["emboss-right"]}
          aria-label="Previous track"
          type="button"
        >
          <PlaybackControlPanelPrev />
        </button>
        <button
          class={`${styles["emboss-left"]} ${styles["emboss-right"]}`}
          aria-label={playing() ? "Pause" : "Play"}
          onClick={() => setPlaying(!playing())}
          type="button"
        >
          <PlaybackControlPanelPlayPause playing={playing()} />
        </button>
        <button
          class={styles["emboss-left"]}
          aria-label="Next track"
          type="button"
        >
          <PlaybackControlPanelNext />
        </button>
      </fieldset>
    </div>
  );
}

import { Show, createSignal } from "solid-js";
import styles from "./PlaybackControlPanel.module.css";

export function PlaybackControlPanel() {
  const [playing, _setPlaying] = createSignal(false);
  return (
    <div class={`panel ${styles.background}`}>
      <fieldset class={styles.controls} aria-label="Playback controls">
        <button type="button" aria-label="Previous track">
          ⏮️
        </button>
        <Show when={!playing()}>
          <button type="button" aria-label="Play">
            ▶️
          </button>
        </Show>
        <Show when={playing()}>
          <button type="button" aria-label="Pause">
            ⏸️
          </button>
        </Show>
        <button type="button" aria-label="Next track">
          ⏭️
        </button>
      </fieldset>
    </div>
  );
}

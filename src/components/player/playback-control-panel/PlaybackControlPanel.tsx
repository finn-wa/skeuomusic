import { createSignal } from "solid-js";
import { PlayPauseIcon } from "~/components/icons/PlayPauseIcon";
import {
  PlaybackNextIcon,
  PlaybackPrevIcon,
} from "../../icons/PlaybackPrevNextIcons";
import styles from "./PlaybackControlPanel.module.css";

const iconHeight = "45%";

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
          <PlaybackPrevIcon height={iconHeight} />
        </button>
        <button
          class={`${styles["emboss-left"]} ${styles["emboss-right"]}`}
          aria-label={playing() ? "Pause" : "Play"}
          onClick={() => setPlaying(!playing())}
          type="button"
        >
          <PlayPauseIcon playing={playing()} height={iconHeight} />
        </button>
        <button
          class={styles["emboss-left"]}
          aria-label="Next track"
          type="button"
        >
          <PlaybackNextIcon height={iconHeight} />
        </button>
      </fieldset>
    </div>
  );
}

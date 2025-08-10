import { PlayPauseIcon } from "~/components/icons/PlayPauseIcon";
import { usePlayerContext } from "~/lib/player/player-context";
import {
  PlaybackNextIcon,
  PlaybackPrevIcon,
} from "../../icons/PlaybackPrevNextIcons";
import styles from "./PlaybackControlPanel.module.css";

const iconHeight = "45%";

export function PlaybackControlPanel() {
  const { state, action, dispatch } = usePlayerContext();
  const togglePlayPause = () =>
    dispatch(state.playing ? action.pause() : action.play());

  return (
    <div class={`panel ${styles.background}`}>
      <fieldset class={styles.controls} aria-label="Playback controls">
        <button
          class={styles["emboss-right"]}
          aria-label="Previous track"
          type="button"
          onClick={() => dispatch(action.previous())}
        >
          <PlaybackPrevIcon height={iconHeight} />
        </button>
        <button
          class={`${styles["emboss-left"]} ${styles["emboss-right"]}`}
          aria-label={state.playing ? "Pause" : "Play"}
          onClick={togglePlayPause}
          type="button"
        >
          <PlayPauseIcon playing={state.playing} height={iconHeight} />
        </button>
        <button
          class={styles["emboss-left"]}
          aria-label="Next track"
          type="button"
          onClick={() => dispatch(action.next())}
        >
          <PlaybackNextIcon height={iconHeight} />
        </button>
      </fieldset>
    </div>
  );
}

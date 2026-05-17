import { PlayPauseIcon } from "~/components/icons/PlayPauseIcon";
import { useMusicContext } from "~/lib/client/music-context";
import {
  PlaybackNextIcon,
  PlaybackPrevIcon,
} from "../../icons/PlaybackPrevNextIcons";
import styles from "./PlaybackControlPanel.module.css";

const iconHeight = "45%";

export function PlaybackControlPanel() {
  const { state, action, dispatch } = useMusicContext().playerStore;
  const togglePlayPause = () =>
    dispatch(state.playing ? action.pause() : action.play());

  return (
    <div class={`panel ${styles.background}`}>
      <fieldset class={styles.controls} aria-label="Playback controls">
        <button
          class={`btn-shine ${styles["emboss-right"]}`}
          aria-label="Previous track"
          type="button"
          onClick={() => dispatch(action.previous())}
        >
          <PlaybackPrevIcon height={iconHeight} />
        </button>
        <button
          class={`btn-shine ${styles["emboss-left"]} ${styles["emboss-right"]} shine`}
          aria-label={state.playing ? "Pause" : "Play"}
          onClick={togglePlayPause}
          type="button"
        >
          <PlayPauseIcon playing={state.playing} height={iconHeight} />
        </button>
        <button
          class={`btn-shine ${styles["emboss-left"]}`}
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

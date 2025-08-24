import { Show } from "solid-js";
import { usePlayerContext } from "~/lib/player/player-context";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import styles from "./PlaybackControlOverlay.module.css";
import { RepeatButton } from "./RepeatButton";
import { ShuffleButton } from "./ShuffleButton";

export type PlaybackControlOverlayProps = {
  show: boolean;
};

// TODO: I think this is actually three columns, convert to grid layout
export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  const { state } = usePlayerContext();
  return (
    <Show when={props.show}>
      <div class={styles.outline}>
        <div class={styles.background}>
          <div class={styles.row}>
            <span class={`h4 ${styles["track-number"]}`}>
              {`${state.track?.current ?? 0} of ${state.track?.total ?? 0}`}
            </span>
          </div>
          <PlaybackTimeline />
          <div class={`${styles["shuffle-repeat"]} ${styles.row}`}>
            <RepeatButton />
            <ShuffleButton />
          </div>
        </div>
      </div>
    </Show>
  );
}

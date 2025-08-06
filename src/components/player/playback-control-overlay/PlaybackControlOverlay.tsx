import { Show, createSignal } from "solid-js";
import { RepeatIcon } from "~/components/icons/RepeatIcon";
import { ShuffleIcon } from "~/components/icons/ShuffleIcon";
import { usePlayerContext } from "~/lib/player/player-context";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import styles from "./PlaybackControlOverlay.module.css";

export type PlaybackControlOverlayProps = {
  show: boolean;
};

// TODO: I think this is actually three columns, convert to grid layout
export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  const { state, actions } = usePlayerContext();
  const timestampSignal = createSignal(10);
  return (
    <Show when={props.show}>
      <div class={styles.outline}>
        <div class={styles.background}>
          <div class={styles.row}>
            <span class={`h4 ${styles["track-number"]}`}>
              {`${state.track?.current ?? 0} of ${state.track?.total ?? 0}`}
            </span>
          </div>
          <PlaybackTimeline
            currentSeconds={timestampSignal}
            playing={state.playing}
            totalSeconds={100}
          />
          <div class={`${styles["shuffle-repeat"]} ${styles.row}`}>
            <RepeatIcon height="28px" />
            <ShuffleIcon height="28px" />
          </div>
        </div>
      </div>
    </Show>
  );
}

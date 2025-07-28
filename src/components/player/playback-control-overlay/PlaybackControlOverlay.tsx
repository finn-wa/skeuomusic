import { Show, createSignal } from "solid-js";
import { RepeatIcon } from "~/components/icons/RepeatIcon";
import { ShuffleIcon } from "~/components/icons/ShuffleIcon";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import styles from "./PlaybackControlOverlay.module.css";

export type PlaybackControlOverlayProps = {
  show: boolean;
  currentTrack: number;
  totalTracks: number;
};

// TODO: I think this is actually three columns, convert to grid layout
export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  const timestampSignal = createSignal(10);
  return (
    <Show when={props.show}>
      <div class={styles.outline}>
        <div class={styles.background}>
          <div class={styles.row}>
            <span class={`h4 ${styles["track-number"]}`}>
              {`${props.currentTrack} of ${props.totalTracks}`}
            </span>
          </div>
          <PlaybackTimeline
            currentSeconds={timestampSignal}
            playing={false}
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

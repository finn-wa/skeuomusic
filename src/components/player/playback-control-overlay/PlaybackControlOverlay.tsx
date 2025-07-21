import { Show, createSignal } from "solid-js";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import styles from "./PlaybackControlOverlay.module.css";

export type PlaybackControlOverlayProps = {
  show: boolean;
  currentTrack: number;
  totalTracks: number;
};

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
            playing={true}
            totalSeconds={100}
          />
        </div>
      </div>
    </Show>
  );
}

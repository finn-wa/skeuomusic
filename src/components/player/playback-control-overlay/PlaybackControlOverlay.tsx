import { Show, createSignal } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
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
            <small class={styles["track-number"]}>
              {`${props.currentTrack} of ${props.totalTracks}`}
            </small>
          </div>
          <div class={`${styles.row} ${styles["timeline-container"]}`}>
            <RangeInput
              value={timestampSignal}
              max={120}
              customClass={styles.timeline}
            />
          </div>
        </div>
      </div>
    </Show>
  );
}

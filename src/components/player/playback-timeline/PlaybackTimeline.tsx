import { type Signal, createEffect, createSignal } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import { formatTrackDuration } from "~/lib/client/music-utils";
import styles from "./PlaybackTimeline.module.css";

type PlaybackTimelineProps = {
  readonly currentSeconds: Signal<number>;
  totalSeconds: number;
  playing: boolean;
};

export default function PlaybackTimeline(props: PlaybackTimelineProps) {
  const [playedAt, setPlayedAt] = createSignal<{
    epochMs: number;
    trackMs: number;
  } | null>(null);

  const [timeSeconds, setTimeSeconds] = props.currentSeconds;
  const currentTime = () => formatTrackDuration(timeSeconds() * 1000);
  const remainingTime = () =>
    formatTrackDuration((props.totalSeconds - timeSeconds()) * 1000);

  // ugly workaround for duplicate timers being created when hmr runs

  createEffect(() => {
    if (
      props.playing &&
      playedAt() == null &&
      timeSeconds() < props.totalSeconds
    ) {
      setPlayedAt({
        epochMs: Date.now(),
        trackMs: timeSeconds() * 1000,
      });
      return;
    }
    if (!props.playing && playedAt() != null) {
      setPlayedAt(null);
    }
  });

  let timer: NodeJS.Timeout | number | null = null;
  createEffect(() => {
    const playedAtValue = playedAt();
    if (playedAtValue != null && timer == null) {
      const { epochMs, trackMs } = playedAtValue;
      timer = setInterval(() => {
        if (
          timer != null &&
          (timeSeconds() >= props.totalSeconds || !props.playing)
        ) {
          clearInterval(timer);
          timer = null;
          setPlayedAt(null);
          return;
        }
        const calcTimeSeconds = (Date.now() - epochMs + trackMs) / 1000;
        if (calcTimeSeconds > timeSeconds()) {
          setTimeSeconds(timeSeconds() + 1);
        }
      }, 1000);
    }
  });
  return (
    <div class={styles.container}>
      <div class={`${styles.timestamp} ${styles.left}`}>{currentTime()}</div>
      <div class={styles["timeline-container"]}>
        <RangeInput
          value={props.currentSeconds}
          max={props.totalSeconds ?? 60}
          customClass={styles.timeline}
        />
      </div>
      <div class={`${styles.timestamp} ${styles.right}`}>
        {`-${remainingTime()}`}
      </div>
    </div>
  );
}

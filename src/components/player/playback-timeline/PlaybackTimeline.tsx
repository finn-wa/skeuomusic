import { createEffect, createSignal, onCleanup } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import { formatTrackDuration } from "~/lib/client/music-utils";
import { usePlayerContext } from "~/lib/player/player-context";
import styles from "./PlaybackTimeline.module.css";

export default function PlaybackTimeline() {
  const { state, action, dispatch } = usePlayerContext();

  const [timeSeconds, setTimeSeconds] = createSignal(0);
  const currentTime = () => formatTrackDuration(timeSeconds() * 1000);
  const remainingTime = () =>
    formatTrackDuration(state.song?.durationMs ?? 0 - timeSeconds() * 1000);

  const onSeek = (positionSecs: number) => {
    dispatch(action.seek(positionSecs * 1000));
  };

  let timer: NodeJS.Timeout | number | undefined;
  createEffect(() => {
    if (!state.playing) {
      clearInterval(timer);
      return;
    }
    if (state.playedAt == null || state.song == null) {
      return;
    }
    if (timer != null) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      const calcTimeSeconds = Math.round(
        (Date.now() - state.playedAt!.epochMs + state.playedAt!.trackMs) / 1000,
      );
      if (calcTimeSeconds > timeSeconds()) {
        setTimeSeconds(calcTimeSeconds);
      }
    }, 1000);

    onCleanup(() => clearInterval(timer));
  });

  return (
    <div class={styles.container}>
      <div class={`${styles.timestamp} ${styles.left}`}>{currentTime()}</div>
      <div class={styles["timeline-container"]}>
        <RangeInput
          value={timeSeconds()}
          valueInput={onSeek}
          max={Math.ceil((state.song?.durationMs ?? 0) / 1000)}
          customClass={styles.timeline}
        />
      </div>
      <div class={`${styles.timestamp} ${styles.right}`}>
        {`-${remainingTime()}`}
      </div>
    </div>
  );
}

import { createEffect, createSignal, onCleanup } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import { formatTrackTimeSecs } from "~/lib/client/music-utils";
import { usePlayerContext } from "~/lib/player/player-context";

export default function PlaybackTimeline() {
  const { state, action, dispatch } = usePlayerContext();

  const [timeMs, setTimeMs] = createSignal(0);
  const durationSecs = () => {
    const durationMs = state.song?.durationMs;
    if (durationMs == null) {
      return 0;
    }
    return Math.round(durationMs / 1000);
  };
  const timeSecs = () => {
    if (state.song == null) {
      return 0;
    }
    return Math.min(durationSecs(), Math.floor(timeMs() / 1000));
  };
  const remainingTimeSecs = () => Math.max(0, durationSecs() - timeSecs());

  const onSeek = (positionSecs: number) => {
    dispatch(action.seek(positionSecs * 1000));
  };

  let timer: NodeJS.Timeout | number | undefined;
  const clearTimer = () => {
    if (timer == null) {
      return;
    }
    clearInterval(timer);
    timer = undefined;
  };
  createEffect(() => {
    if (state.playedAt == null || state.song == null) {
      clearTimer();
      setTimeMs(0);
      return;
    }
    if (timer != null) {
      return;
    }
    timer = setInterval(() => {
      const playedAt = state.playedAt;
      if (playedAt == null || state.song == null) {
        return;
      }
      if (!state.playing) {
        setTimeMs(playedAt.trackMs);
        return;
      }
      setTimeMs(Date.now() - playedAt.epochMs + playedAt.trackMs);
    }, 1000);

    onCleanup(() => clearTimer());
  });

  return (
    <>
      <div class="playback-timestamp time-current">
        {formatTrackTimeSecs(timeSecs())}
      </div>
      <div class="playback-timeline">
        <RangeInput
          value={timeSecs()}
          valueInput={onSeek}
          max={durationSecs()}
          customClass="timeline-slider"
        />
      </div>
      <div class="playback-timestamp time-remaining">
        {`-${formatTrackTimeSecs(remainingTimeSecs())}`}
      </div>
    </>
  );
}

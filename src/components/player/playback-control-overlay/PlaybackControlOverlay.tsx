import { type JSX, Show, createSignal } from "solid-js";
import { RepeatIcon } from "~/components/icons/RepeatIcon";
import { ShuffleIcon } from "~/components/icons/ShuffleIcon";
import { usePlayerContext } from "~/lib/player/player-context";
import type { Repeat } from "~/lib/player/player-store";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import styles from "./PlaybackControlOverlay.module.css";

export type PlaybackControlOverlayProps = {
  show: boolean;
};

type RepeatState = {
  current: Repeat;
  description: string;
  checked: JSX.AriaAttributes["aria-checked"];
};

// TODO: I think this is actually three columns, convert to grid layout
export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  const { state, action, dispatch } = usePlayerContext();
  const timestampSignal = createSignal(10);

  // label: Repeat
  const repeatStates: RepeatState[] = [
    { current: "off", checked: "false", description: "Enable repeat" },
    { current: "context", checked: "true", description: "Enable repeat one" },
    { current: "track", checked: "mixed", description: "Disable repeat" },
  ];
  const [repeatIndex, setRepeatIndex] = createSignal<number>(0);
  const nextRepeatState = () => {
    setRepeatIndex((repeatIndex() + 1) % repeatStates.length);
  };
  const repeatState = () => repeatStates[repeatIndex()];
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
            totalSeconds={state.track?.total ?? 0}
          />
          <div class={`${styles["shuffle-repeat"]} ${styles.row}`}>
            <button
              type="button"
              aria-label="Repeat"
              aria-describedby="repeat-tooltip"
              aria-checked={repeatState().checked}
              onClick={nextRepeatState}
            >
              <RepeatIcon height="28px" state={repeatState().current} />
              <div id="repeat-tooltip" style={{ display: "none" }}>
                {/* TODO: add tooltip support */}
                {repeatState().description}
              </div>
            </button>
            <ShuffleIcon height="28px" />
          </div>
        </div>
      </div>
    </Show>
  );
}

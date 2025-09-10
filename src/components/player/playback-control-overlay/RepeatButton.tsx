import { RepeatIcon } from "~/components/icons/RepeatIcon";
import { usePlayerContext } from "~/lib/player/player-context";
import type { Repeat } from "~/lib/player/player-store";

export function RepeatButton() {
  const { state, action, dispatch } = usePlayerContext();
  const repeatOrder: Readonly<Repeat[]> = ["off", "context", "track"];
  const repeatDescription: Record<Repeat, string> = {
    off: "Enable repeat",
    context: "Enable repeat one",
    track: "Disable repeat",
  };
  const nextRepeat = () => {
    const repeatIndex = repeatOrder.indexOf(state.repeat);
    const nextRepeat = repeatOrder[(repeatIndex + 1) % repeatOrder.length];
    dispatch(action.setRepeat(nextRepeat));
  };

  return (
    <button
      type="button"
      aria-label="Repeat"
      aria-describedby="repeat-tooltip"
      onClick={nextRepeat}
      class="playback-repeat"
    >
      <RepeatIcon height="28px" state={state.repeat} />
      <div id="repeat-tooltip" style={{ display: "none" }}>
        {/* TODO: add tooltip support */}
        {repeatDescription[state.repeat]}
      </div>
    </button>
  );
}

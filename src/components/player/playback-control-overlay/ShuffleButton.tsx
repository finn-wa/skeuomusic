import { ShuffleIcon } from "~/components/icons/ShuffleIcon";
import { usePlayerContext } from "~/lib/player/player-context";

export function ShuffleButton() {
  const { state, action, dispatch } = usePlayerContext();
  const toggleShuffle = () => {
    dispatch(action.setShuffle(!state.shuffle));
  };
  return (
    <button
      type="button"
      aria-label="Shuffle"
      aria-pressed={state.shuffle}
      onClick={toggleShuffle}
    >
      <ShuffleIcon height="28px" shuffle={state.shuffle} />
    </button>
  );
}

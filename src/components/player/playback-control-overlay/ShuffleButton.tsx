import { ShuffleIcon } from "~/components/icons/ShuffleIcon";
import { useMusicContext } from "~/lib/client/music-context";

export function ShuffleButton() {
  const { state, action, dispatch } = useMusicContext();
  const toggleShuffle = () => {
    dispatch(action.setShuffle(!state.shuffle));
  };
  return (
    <button
      type="button"
      aria-label="Shuffle"
      aria-pressed={state.shuffle}
      onClick={toggleShuffle}
      class="playback-shuffle"
    >
      <ShuffleIcon height="28px" shuffle={state.shuffle} />
    </button>
  );
}

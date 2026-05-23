import { RangeInput } from "~/components/range-input/RangeInput";
import { useMusicContext } from "~/lib/client/music-context";
import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  const { state, action, dispatch } = useMusicContext().playerStore;

  return (
    <div class={`panel ${styles.background}`}>
      <div class={styles["volume-container"]}>
        <RangeInput
          value={state.volume}
          valueInput={(volume) => dispatch(action.setVolume(volume))}
          customClass={styles.volume}
        />
      </div>
    </div>
  );
}

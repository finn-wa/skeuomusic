import { createSignal } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  const volume = createSignal(50);

  return (
    <div class={`panel ${styles.background}`}>
      <div class={styles["volume-container"]}>
        <RangeInput value={volume} customClass={styles.volume} />
      </div>
    </div>
  );
}

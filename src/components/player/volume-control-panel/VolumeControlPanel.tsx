import { createSignal } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  const volume = createSignal(5);

  return (
    <div class={`panel ${styles.background}`}>
      <RangeInput min={0} max={10} value={volume} customClass={styles.volume} />
    </div>
  );
}

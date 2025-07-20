import { createSignal } from "solid-js";
import { RangeInput } from "~/components/range-input/RangeInput";
import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  const volume = createSignal(50);

  return (
    <div class={`panel ${styles.background}`}>
      <RangeInput value={volume} customClass={styles.volume} />
    </div>
  );
}

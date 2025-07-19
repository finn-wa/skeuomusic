import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  return (
    <div class={`panel ${styles.background}`}>
      <div>
        <button class={styles.knob} type="button" />
      </div>
    </div>
  );
}

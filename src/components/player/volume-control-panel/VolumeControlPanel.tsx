import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  let slider!: HTMLDivElement;
  function setKnobPosition(value: string) {
    slider.style.setProperty("--range-percent", `${value}%`);
  }
  function onInput(value: string) {
    setKnobPosition(value);
  }
  function onChange(value: string) {
    setKnobPosition(value);
  }
  return (
    <div class={`panel ${styles.background}`}>
      <div class={`${styles.slider} ${styles.volume}`} ref={slider}>
        <div class={styles.icing}>
          <div class={styles.track} />
          <div class={styles.progress} />
          <div class={styles.knob} />
        </div>
        <input
          type="range"
          class={styles.range}
          onInput={(e) => onInput(e.target.value)}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

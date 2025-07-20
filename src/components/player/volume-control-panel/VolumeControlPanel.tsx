import styles from "./VolumeControlPanel.module.css";

export function VolumeControlPanel() {
  let knobElement!: HTMLDivElement;
  function setKnobPosition(value: string) {
    knobElement.style.left = `${value}%`;
  }
  function onInput(value: string) {
    setKnobPosition(value);
  }
  function onChange(value: string) {
    setKnobPosition(value);
  }
  return (
    <div class={`panel ${styles.background}`}>
      <div class={styles.slider}>
        <div class={styles["knob-container"]}>
          <div class={`${styles.knob}`} ref={knobElement} />
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

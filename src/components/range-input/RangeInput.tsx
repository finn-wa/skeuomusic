import { type Signal, createEffect, mergeProps, onMount } from "solid-js";
import styles from "./RangeInput.module.css";

export type RangeInputProps = {
  readonly value: Signal<number>;
  min?: number;
  max?: number;
  /** Set CSS variables in this class to override appearance */
  customClass?: string;
};

// Used in volume control and audio bar (scrubbing)
export function RangeInput(rawProps: RangeInputProps) {
  const props = mergeProps({ min: 0, max: 100 }, rawProps);
  const [value, setValue] = props.value;

  createEffect(() => {
    setKnobPosition(value());
  });

  let slider!: HTMLDivElement;

  function setKnobPosition(newValue: number) {
    const valueDecimal = (newValue - props.min) / (props.max - props.min);
    const valuePercent = Math.round(valueDecimal * 100);
    slider.style.setProperty("--range-percent", `${valuePercent}%`);
  }

  function onRangeInputEvent(event: { target: HTMLInputElement }) {
    const value = Number.parseInt(event.target.value);
    setKnobPosition(value);
  }

  function onRangeChangeEvent(event: { target: HTMLInputElement }) {
    const value = Number.parseInt(event.target.value);
    setValue(value);
  }

  return (
    <div class={styles.slider} ref={slider}>
      <div class={`${styles.icing} ${props.customClass ?? ""}`}>
        <div class={styles.track} />
        <div class={styles.progress} />
        <div class={styles.knob} />
      </div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        class={styles.range}
        onInput={(e) => onRangeInputEvent(e)}
        onChange={(e) => onRangeChangeEvent(e)}
      />
    </div>
  );
}

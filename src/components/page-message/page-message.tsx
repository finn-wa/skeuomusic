import { Slot, component$ } from "@builder.io/qwik";
import styles from "./page-message.module.css";

export interface PageMessageProps {
  message?: string;
}

export const PageMessage = component$<PageMessageProps>((props) => {
  return (
    <div class={styles.container}>
      <span class={styles.message}>
        {props.message ? props.message : <Slot />}
      </span>
    </div>
  );
});

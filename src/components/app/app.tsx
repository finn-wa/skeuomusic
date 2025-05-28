import { component$ } from "@builder.io/qwik";
import styles from "./app.module.css";
import { TabBar } from "../tab-bar/tab-bar";
import { RouterOutlet } from "@builder.io/qwik-city";

export const App = component$(() => {
  return (
    <div class={styles.app}>
      <div class={styles.content}>
        <RouterOutlet />
      </div>
      <TabBar />
    </div>
  );
});

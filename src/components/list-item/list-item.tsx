import { component$ } from "@builder.io/qwik";
import styles from "./list-item.module.css";

export interface ListItemProps {
  title: string;
}

export const ListItem = component$<ListItemProps>((props) => {
  return (
    <li class={[styles.item, "emboss-y"]}>
      <span class="h2">{props.title}</span>
    </li>
  );
});

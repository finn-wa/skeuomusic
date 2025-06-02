import { component$ } from "@builder.io/qwik";
import styles from "./list-item.module.css";

export interface ListItemProps {
  title: string;
  hide?: boolean;
}

export const ListItem = component$<ListItemProps>((props) => {
  return (
    <li class={[styles.item, "emboss-y", { "d-none": props.hide }]}>
      <span class="h2">{props.title}</span>
    </li>
  );
});

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./list-item.module.css";

export interface ListItemProps {
  title: string;
}

export const ListItem = component$<ListItemProps>((props) => {
  return <li class={["emboss-y", styles.item]}>{props.title}</li>;
});

import { Link } from "@tanstack/solid-router";
import styles from "./NavTab.module.css";

export interface TabButtonProps {
  route: string;
  label: string;
}

export default function NavTab(props: TabButtonProps) {
  return (
    <Link
      to={props.route}
      class={styles.tab}
      activeProps={{ class: styles.selected }}
    >
      <small>{props.label}</small>
    </Link>
  );
}

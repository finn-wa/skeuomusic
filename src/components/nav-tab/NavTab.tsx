import { A } from "@solidjs/router";
import styles from "./NavTab.module.css";

export interface TabButtonProps {
  route: string;
  label: string;
}

export default function NavTab(props: TabButtonProps) {
  return (
    <A class={styles.tab} activeClass={styles.selected} href={props.route}>
      <small>{props.label}</small>
    </A>
  );
}

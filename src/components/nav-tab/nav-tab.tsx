import { Slot, component$, useComputed$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import styles from "./nav-tab.module.css";

export interface TabButtonProps {
  route: string;
}

export const NavTab = component$<TabButtonProps>((props) => {
  const location = useLocation();
  const selectedClass = useComputed$(() =>
    location.url.pathname.startsWith(props.route) ? styles.selected : "",
  );
  return (
    <Link
      class={["emboss-x", styles.tab, selectedClass.value]}
      href={props.route}
    >
      <Slot />
    </Link>
  );
});

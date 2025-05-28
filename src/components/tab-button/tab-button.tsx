import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import styles from "./tab-button.module.css";

export interface TabButtonProps {
  route: string;
}

export const TabButton = component$<TabButtonProps>((props) => {
  const location = useLocation();
  return (
    <Link
      class={[
        styles.tab,
        location.url.pathname.startsWith(props.route) && styles.selected,
      ]}
      href={props.route}
    >
      <Slot />
    </Link>
  );
});

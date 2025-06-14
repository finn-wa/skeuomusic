import { Link } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export interface TabButtonProps {
  route: string;
  label: string;
}

export default function NavTab(props: TabButtonProps) {
  const [clicked, setClicked] = createSignal(false);
  return (
    <Link
      to={props.route}
      class="tab"
      activeProps={{ class: "selected" }}
      hash={clicked() ? undefined : INITIAL_SCROLL_ID}
      onClick={() => setTimeout(() => setClicked(true), 0)}
    >
      <small>{props.label}</small>
    </Link>
  );
}

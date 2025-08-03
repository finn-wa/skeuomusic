import { Link } from "@tanstack/solid-router";
import { type FlowProps, children, createSignal } from "solid-js";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export type TabButtonProps = FlowProps<{
  route: string;
  label: string;
}>;

export default function NavTab(props: TabButtonProps) {
  const [clicked, setClicked] = createSignal(false);
  const icon = children(() => props.children);

  return (
    <Link
      to={props.route}
      class="tab"
      activeProps={{ class: "selected" }}
      hash={clicked() ? undefined : INITIAL_SCROLL_ID}
      onClick={() => setTimeout(() => setClicked(true), 0)}
    >
      <div class="tab-border">
        {icon()}
        <small>{props.label}</small>
      </div>
    </Link>
  );
}

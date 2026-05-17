import { Link } from "@tanstack/solid-router";
import { Show } from "solid-js";

export interface ListItemProps {
  name: string;
  href?: string;
  hide?: boolean;
}

export default function ListItem(props: ListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: props.hide ? "none" : undefined }}
    >
      <Show
        when={props.href != null}
        fallback={<span class="h2 item-text">{props.name}</span>}
      >
        <Link class="h2 item-text" to={props.href}>
          {props.name}
        </Link>
      </Show>
    </li>
  );
}

import { type Accessor, Show } from "solid-js";

export interface ListItemProps {
  name: string;
  href?: string;
  hide?: Accessor<boolean>;
}

export default function ListItem({
  name,
  href,
  hide = () => false,
}: ListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : undefined }}
    >
      <Show
        when={href != null}
        fallback={<span class="h2 item-text">{name}</span>}
      >
        <a class="h2 item-text" href={href}>
          {name}
        </a>
      </Show>
    </li>
  );
}

import type { Accessor } from "solid-js";

export interface ListItemProps {
  name: string;
  hide?: Accessor<boolean>;
}

export default function ListItem({ name, hide = () => false }: ListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : undefined }}
    >
      <span class="h2 p-3 text-truncate">{name}</span>
    </li>
  );
}

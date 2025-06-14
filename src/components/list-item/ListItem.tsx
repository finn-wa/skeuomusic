export interface ListItemProps {
  name: string;
  hide?: boolean;
}

export default function ListItem(props: ListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: props.hide ? "none" : undefined }}
    >
      <span class="h2 p-3 text-truncate">{props.name}</span>
    </li>
  );
}

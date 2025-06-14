export interface ListItemProps {
  name: string;
  hide?: boolean;
}

export default function ListItem(props: ListItemProps) {
  return (
    <li
      class="list-item emboss-y"
      style={{ display: props.hide ? "none" : undefined }}
    >
      <span class="h2">{props.name}</span>
    </li>
  );
}

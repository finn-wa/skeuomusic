import type { Item } from "@/shared/types";
import { Link } from "@tanstack/react-router";

export type ItemWithLink = Item & { href?: string };

export interface ListItemProps {
  item: ItemWithLink;
  hide?: boolean;
}

export default function ListItem({ item, hide }: ListItemProps) {
  return (
    <li
      className="list-item emboss-y text-truncate"
      style={{ display: hide ? "none" : undefined }}
      data-testid={"list-item-" + item.id}
    >
      {item.href == null ? (
        <span className="h2 item-text">{item.name}</span>
      ) : (
        <Link className="h2 item-text" to={item.href}>
          {item.name}
        </Link>
      )}
    </li>
  );
}

import { formatArtists } from "@/shared/music-utils";
import type { Item } from "@/shared/types";
import type { ListItemProps } from "./list-item";

export type SongListItemData = Item & {
  click?: () => string;
  album: string | undefined;
  artists: { name: string }[];
};

export type SongListItemProps = ListItemProps<SongListItemData>;

export default function SongListItem({ item, hide }: SongListItemProps) {
  const subtitle = item.album
    ? `${formatArtists(item.artists)} - ${item.album}`
    : formatArtists(item.artists);
  return (
    <li
      className="list-item emboss-y text-truncate"
      style={{ display: hide ? "none" : undefined }}
    >
      <button
        className="flex-col px-3 py-2 text-truncate"
        type="button"
        onClick={item.click}
      >
        <span className="h2 text-truncate">{item.name}</span>
        <span className="subtitle text-truncate">{subtitle}</span>
      </button>
    </li>
  );
}

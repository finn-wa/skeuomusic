import type { Item } from "@/shared/types";
import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { AlbumCoverThumbnail } from "../album-cover/album-cover-thumbnail";
import type { ListItemProps } from "./list-item";
import { formatArtists } from "@/shared/music-utils";

export type AlbumListItemData = Item & {
  href?: string;
  coverArtId?: string;
  artists: {
    name: string;
  }[];
};

export type AlbumListItemProps = ListItemProps<AlbumListItemData>;

export default memo(function AlbumListItem({ item, hide }: AlbumListItemProps) {
  return (
    <li
      className="list-item emboss-y text-truncate"
      style={{ display: hide ? "none" : "flex" }}
    >
      <Link className="item-link" to={item.href ?? `./${item.id}`}>
        <AlbumCoverThumbnail
          name={item.name}
          coverArtId={item.coverArtId}
          albumId={item.id}
        />
        <div className="flex-col p-2 text-truncate">
          <span className="h2 text-truncate">{item.name}</span>
          <span className="subtitle text-truncate">{formatArtists(item.artists)}</span>
        </div>
      </Link>
    </li>
  );
});

import { Link } from "@tanstack/solid-router";
import type { Accessor } from "solid-js";
import type { Album } from "~/lib/types";
import Image from "../image/Image";

export type AlbumListItemProps = {
  album: Album;
  href?: string;
  hide?: Accessor<boolean>;
};

export default function AlbumListItem({
  album,
  href,
  hide = () => false,
}: AlbumListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : "flex" }}
    >
      <Link class="item-link" to={href}>
        <Image
          srcset={album.images}
          alt={`${album.name} cover art`}
          sizes="58px"
          class="thumb"
        />
        <div class="flex-col p-2 text-truncate">
          <span class="h2 text-truncate">{album.name}</span>
          <span class="subtitle text-truncate">
            {album.artists.map((artist) => artist.name).join(", ")}
          </span>
        </div>
      </Link>
    </li>
  );
}

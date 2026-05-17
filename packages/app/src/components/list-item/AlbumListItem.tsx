import { Link } from "@tanstack/solid-router";
import type { Album } from "~/lib/types";
import Image from "../image/Image";

export type AlbumListItemProps = {
  album: Album;
  href?: string;
  hide?: boolean;
};

export default function AlbumListItem(props: AlbumListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: props.hide ? "none" : "flex" }}
    >
      <Link class="item-link" to={props.href}>
        <Image
          srcset={props.album.images}
          alt={`${props.album.name} cover art`}
          sizes="58px"
          class="thumb"
        />
        <div class="flex-col p-2 text-truncate">
          <span class="h2 text-truncate">{props.album.name}</span>
          <span class="subtitle text-truncate">
            {props.album.artists.map((artist) => artist.name).join(", ")}
          </span>
        </div>
      </Link>
    </li>
  );
}

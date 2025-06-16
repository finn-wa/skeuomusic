import type { Accessor } from "solid-js";
import type { Album } from "~/lib/types";
import Image from "../image/Image";

export type AlbumListItemProps = {
  song: Album;
  href?: string;
  hide?: Accessor<boolean>;
};

export default function AlbumListItem({
  song,
  href,
  hide = () => false,
}: AlbumListItemProps) {
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : "flex" }}
    >
      <a class="item-link" href={href}>
        <Image
          srcset={song.images}
          alt={`${song.name} cover art`}
          sizes="58px"
          class="thumb"
        />
        <div class="flex-col p-2 text-truncate">
          <span class="h2 text-truncate">{song.name}</span>
          <span class="subtitle text-truncate">
            {song.artists.map((artist) => artist.name).join(", ")}
          </span>
        </div>
      </a>
    </li>
  );
}

import type { Accessor } from "solid-js";
import fallbackImage from "~/assets/fallback-album-thumbnail.png?url";
import type { Album } from "~/lib/types";

export type AlbumListItemProps = {
  song: Album;
  href?: string;
  hide?: Accessor<boolean>;
};

export default function AlbumListItem({
  song,
  hide = () => false,
}: AlbumListItemProps) {
  const thumbnail = song.images.at(-1) ?? {
    height: 64,
    width: 64,
    url: fallbackImage,
  };

  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : "flex" }}
    >
      <img
        src={thumbnail.url}
        alt={`${song.name} cover art`}
        width={thumbnail.width}
        height={thumbnail.height}
        class="thumb"
      />
      <div class="flex-col p-2 text-truncate">
        <span class="h2 text-truncate">{song.name}</span>
        <span class="subtitle text-truncate">
          {song.artists.map((artist) => artist.name).join(", ")}
        </span>
      </div>
    </li>
  );
}

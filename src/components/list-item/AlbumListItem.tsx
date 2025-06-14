import type { Album, Item } from "~/lib/types";
import fallbackImage from "../../../public/favicon-64.png";

export type AlbumListItemProps = Album & {
  hide?: boolean;
};

export default function AlbumListItem(props: AlbumListItemProps) {
  const thumbnail = props.images.at(-1) ?? {
    height: 64,
    width: 64,
    url: fallbackImage,
  };

  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: props.hide ? "none" : "flex" }}
    >
      <img
        src={thumbnail.url}
        alt={`${props.name} cover art`}
        width={thumbnail.width}
        height={thumbnail.height}
        class="list-item-img"
      />
      <div class="flex-col p-2 text-truncate">
        <span class="h2 text-truncate">{props.name}</span>
        <span class="subtitle text-truncate">
          {props.artists.map((artist) => artist.name).join(", ")}
        </span>
      </div>
    </li>
  );
}

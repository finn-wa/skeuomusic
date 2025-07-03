import type { Accessor } from "solid-js";
import { formatArtists } from "~/lib/client/music-utils";
import type { Song } from "~/lib/types";

export type SongListItemProps = {
  song: Song;
  hide?: Accessor<boolean>;
  click: () => void;
};

export default function SongListItem({
  song,
  click,
  hide = () => false,
}: SongListItemProps) {
  const subtitle = `${formatArtists(song.artists)} - ${song.album.name}`;
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : undefined }}
    >
      <button
        class="flex-col px-3 py-2 text-truncate"
        type="button"
        onclick={click}
      >
        <span class="h2 text-truncate">{song.name}</span>
        <span class="subtitle text-truncate">{subtitle}</span>
      </button>
    </li>
  );
}

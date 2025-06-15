import type { Accessor } from "solid-js";
import type { Song } from "~/lib/types";

export type SongListItemProps = {
  song: Song;
  hide?: Accessor<boolean>;
};

export default function SongListItem({
  song,
  hide = () => false,
}: SongListItemProps) {
  const artists = song.artists.map((artist) => artist.name).join(", ");
  const subtitle = `${artists} - ${song.album.name}`;
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: hide() ? "none" : undefined }}
    >
      <div class="flex-col px-3 py-2">
        <span class="h2 text-truncate">{song.name}</span>
        <span class="subtitle text-truncate">{subtitle}</span>
      </div>
    </li>
  );
}

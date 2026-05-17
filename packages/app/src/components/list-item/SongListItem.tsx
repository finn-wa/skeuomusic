import { formatArtists } from "~/lib/client/music-utils";
import type { Song } from "~/lib/types";

export type SongListItemProps = {
  song: Song;
  hide?: boolean;
  click: () => void;
};

export default function SongListItem(props: SongListItemProps) {
  const subtitle = `${formatArtists(props.song.artists)} - ${props.song.album.name}`;
  return (
    <li
      class="list-item emboss-y text-truncate"
      style={{ display: props.hide ? "none" : undefined }}
    >
      <button
        class="flex-col px-3 py-2 text-truncate"
        type="button"
        onclick={props.click}
      >
        <span class="h2 text-truncate">{props.song.name}</span>
        <span class="subtitle text-truncate">{subtitle}</span>
      </button>
    </li>
  );
}

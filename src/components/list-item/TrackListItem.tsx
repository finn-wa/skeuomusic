import { formatTrackDuration } from "~/lib/client/music-utils";
import type { Track } from "~/lib/types";

export type TrackListItemProps = {
  track: Track;
};

export default function TrackListItem({ track }: TrackListItemProps) {
  return (
    <li class="list-item track text-truncate emboss-y">
      <div class="item-link">
        <div class="track-number emboss-x">{track.trackNumber}</div>
        <div class="track-details p-2 text-truncate emboss-x">
          <span class="text-truncate">{track.name}</span>
          <span class="subtitle text-truncate">
            {formatTrackDuration(track.durationMs)}
          </span>
        </div>
      </div>
    </li>
  );
}

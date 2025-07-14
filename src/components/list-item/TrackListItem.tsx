import { formatTrackDuration } from "~/lib/client/music-utils";
import type { Track } from "~/lib/types";

export type TrackListItemProps = {
  track: Track;
};

export default function TrackListItem(props: TrackListItemProps) {
  return (
    <li class="list-item track text-truncate emboss-y">
      <div class="item-link">
        <div class="track-number">{props.track.trackNumber}</div>
        <div class="track-details p-2 text-truncate emboss-x">
          <span class="text-truncate">{props.track.name}</span>
          <span class="subtitle text-truncate">
            {formatTrackDuration(props.track.durationMs)}
          </span>
        </div>
      </div>
    </li>
  );
}

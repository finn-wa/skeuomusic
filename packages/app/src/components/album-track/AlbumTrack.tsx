import { formatTrackTimeMs } from "~/lib/client/music-utils";
import type { Track } from "~/lib/types";
import styles from "./AlbumTrack.module.css";

export type AlbumTrackProps = {
  track: Track;
};

export default function AlbumTrack(props: AlbumTrackProps) {
  return (
    <li class={`${styles.track} list-item text-truncate emboss-y`}>
      <div class="item-link">
        <div class={styles.number}>{props.track.trackNumber}</div>
        <div class={`${styles.details} p-2 text-truncate emboss-x`}>
          <span class="text-truncate">{props.track.name}</span>
          <span class="subtitle text-truncate">
            {formatTrackTimeMs(props.track.durationMs)}
          </span>
        </div>
      </div>
    </li>
  );
}

import type { Track } from "@/shared/types";
import styles from "./album-track.module.css";
import { formatTrackTimeMs } from "@/shared/music-utils";

export type AlbumTrackProps = {
  track: Track;
};

export default function AlbumTrack({ track }: AlbumTrackProps) {
  return (
    <li className={`${styles.track} list-item text-truncate emboss-y`}>
      <div className="item-link">
        <div className={styles.number}>{track.trackNumber}</div>
        <div className={`${styles.details} p-2 text-truncate emboss-x`}>
          <span className="text-truncate">{track.name}</span>
          <span className="subtitle text-truncate">
            {formatTrackTimeMs(track.durationMs)}
          </span>
        </div>
      </div>
    </li>
  );
}

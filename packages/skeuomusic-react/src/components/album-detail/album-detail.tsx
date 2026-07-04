import type { AlbumWithTracklist } from "@/shared/types";
import styles from "./album-detail.module.css";
import { AlbumArt } from "./album-art/album-art";
import { formatArtists, getRuntimeMins } from "@/shared/music-utils";
import AlbumTrack from "./album-track/album-track";

export type AlbumDetailProps = {
  album: AlbumWithTracklist;
};

/** Displays an album's cover art and tracklist */
export default function AlbumDetail({ album }: AlbumDetailProps) {
  const runtimeMins = getRuntimeMins(album.tracks);
  const artists = formatArtists(album.artists);
  return (
    <>
      <div className={styles.album} id="1">
        <div className={styles.header}>
          <AlbumArt
            name={album.name}
            srcSet={album.images}
            sizes={["(max-width: 1000px) 33vw", "333px"]}
            containerClass={styles.art}
            reflectionClass={styles.reflection}
          />
          <div className={styles.info}>
            <h2 className={styles.title}>
              <span className="h4">{artists}</span>
              <br />
              <span className="h3">{album.name}</span>
            </h2>
            <ul className={styles.facts}>
              <li className={styles.fact}>Released {album.releaseDate}</li>
              <li className={styles.fact}>
                {album.tracks.length} Songs, {runtimeMins} Mins.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ol className="tracklist" aria-label="Tracklist">
        {album.tracks.map((track) => (
          <AlbumTrack key={track.id} track={track} />
        ))}
      </ol>
    </>
  );
}

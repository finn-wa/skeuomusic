import { For } from "solid-js";
import { formatArtists, getRuntimeMins } from "~/lib/client/music-utils";
import type { AlbumWithTracklist } from "~/lib/types";
import { AlbumArt } from "../album-art/AlbumArt";
import AlbumTrack from "../album-track/AlbumTrack";
import styles from "./AlbumDetail.module.css";

export type AlbumDetailProps = {
  readonly album: AlbumWithTracklist;
};

export default function AlbumDetail(props: AlbumDetailProps) {
  const runtimeMins = getRuntimeMins(props.album.tracks);
  const artists = formatArtists(props.album.artists);
  return (
    <>
      <div class={styles.album} id="1">
        <div class={styles.header}>
          <AlbumArt
            name={props.album.name}
            srcset={props.album.images}
            sizes={["(max-width: 1000px) 33vw", "333px"]}
            containerClass={styles.art}
            reflectionClass={styles.reflection}
          />
          <div class={styles.info}>
            <h2 class={styles.title}>
              <span class="h4">{artists}</span>
              <br />
              <span class="h3">{props.album.name}</span>
            </h2>
            <ul class={styles.facts}>
              <li class={styles.fact}>Released {props.album.releaseDate}</li>
              <li class={styles.fact}>
                {props.album.tracks.length} Songs, {runtimeMins} Mins.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ol class="tracklist">
        <For each={props.album.tracks}>
          {(track) => <AlbumTrack track={track} />}
        </For>
      </ol>
    </>
  );
}

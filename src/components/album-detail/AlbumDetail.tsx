import { For } from "solid-js";
import { formatArtists, getRuntimeMins } from "~/lib/client/music-utils";
import type { AlbumWithTracklist } from "~/lib/types";
import Image from "../image/Image";
import TrackListItem from "../list-item/TrackListItem";

export type AlbumDetailProps = {
  readonly album: AlbumWithTracklist;
};

export default function AlbumDetail(props: AlbumDetailProps) {
  const runtimeMins = getRuntimeMins(props.album.tracks);
  const artists = formatArtists(props.album.artists);
  return (
    <>
      <div class="album-detail" id="1">
        <div class="album-header">
          <div class="album-art-container">
            <Image
              srcset={props.album.images}
              sizes={["(max-width: 1000px) 33vw", "333px"]}
              alt={`${props.album.name} cover art`}
              class="album-art"
            />
            <Image
              srcset={props.album.images}
              sizes={["(max-width: 1000px) 33vw", "333px"]}
              alt={`${props.album.name} cover art reflection`}
              class="album-art-reflection"
            />
          </div>
          <div class="album-info">
            <h2 class="album-title">
              <span class="h4">{artists}</span>
              <br />
              <span class="h3">{props.album.name}</span>
            </h2>
            <ul class="album-facts">
              <li>Released {props.album.releaseDate}</li>
              <li>
                {props.album.tracks.length} Songs, {runtimeMins} Mins.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ol class="tracklist">
        <For each={props.album.tracks}>
          {(track) => <TrackListItem track={track} />}
        </For>
      </ol>
    </>
  );
}

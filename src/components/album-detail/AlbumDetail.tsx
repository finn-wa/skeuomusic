import { For } from "solid-js";
import { getRuntimeMins } from "~/lib/client/music-utils";
import type { AlbumWithTracklist } from "~/lib/types";
import Image from "../image/Image";
import TrackListItem from "../list-item/TrackListItem";

export type AlbumDetailProps = {
  readonly album: AlbumWithTracklist;
};

export default function AlbumDetail({ album }: AlbumDetailProps) {
  const runtimeMins = getRuntimeMins(album.tracks);
  const artists = album.artists.map((artist) => artist.name).join(" & ");
  return (
    <>
      <div class="album-detail emboss-y" id="1">
        <div class="album-header">
          <div class="album-art-container">
            <Image
              srcset={album.images}
              sizes={["(max-width: 1000px) 33vw", "333px"]}
              alt={`${album.name} cover art`}
              class="album-art"
            />
            <Image
              srcset={album.images}
              sizes={["(max-width: 1000px) 33vw", "333px"]}
              alt={`${album.name} cover art reflection`}
              class="album-art-reflection"
            />
          </div>
          <div class="album-info">
            <h2 class="album-title">
              <span class="h4">{artists}</span>
              <br />
              <span class="h3">{album.name}</span>
            </h2>
            <ul class="album-facts">
              <li>Released {album.releaseDate}</li>
              <li>
                {album.tracks.length} Songs, {runtimeMins} Mins.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ol class="tracklist">
        <For each={album.tracks}>
          {(track) => <TrackListItem track={track} />}
        </For>
      </ol>
    </>
  );
}

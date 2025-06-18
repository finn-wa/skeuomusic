import { createSignal } from "solid-js";
import type { AlbumWithTracklist } from "~/lib/types";
import Image from "../image/Image";
import SearchInput from "../search-input/SearchInput";

export type AlbumDetailProps = {
  readonly album: AlbumWithTracklist;
};

export default function AlbumDetail({ album }: AlbumDetailProps) {
  const search = createSignal("");
  const runtimeMs = album.tracks.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0,
  );
  const runtimeMins = Math.round(runtimeMs / 60_000);
  const artists = album.artists.map((artist) => artist.name).join(" & ");
  return (
    <>
      <SearchInput query={search} />
      <div class="album-detail">
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
    </>
  );
}

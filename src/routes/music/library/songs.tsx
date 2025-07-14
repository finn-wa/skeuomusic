import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense, useContext } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import SongListItem from "~/components/list-item/SongListItem";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { MusicContext } from "~/lib/client/music-context";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getSongs } from "~/lib/server/spotify-data";

const title = "Songs";
export const Route = createFileRoute("/music/library/songs")({
  component: Songs,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: async () => {
    return { songs: defer(getSongs()) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Songs() {
  const songs = Route.useLoaderData({ select: (ctx) => ctx.songs })();
  const spotifyApi = useContext(MusicContext)?.spotify()!;

  async function playSong(uri: string) {
    console.log(`playing ${uri}`);
    await spotifyApi.player.startResumePlayback("", undefined, [uri]);
  }

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage message="Failed to load songs" />}>
          <Await promise={songs} fallback={<ErrorPage />}>
            {(resolvedSongs) => (
              <AlphabetList
                items={resolvedSongs}
                namePlural="songs"
                itemRenderer={(song, hide) => (
                  <SongListItem
                    song={song}
                    hide={hide}
                    click={() => playSong(song.uri)}
                  />
                )}
              />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

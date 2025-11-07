import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import AlbumListItem from "~/components/list-item/AlbumListItem";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getAlbums } from "~/lib/server/spotify-data";

const title = "Albums";
export const Route = createFileRoute("/music/library/albums/")({
  component: Albums,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: async () => {
    return { albums: defer(getAlbums()) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Albums() {
  const { albums } = Route.useLoaderData()();
  return (
    <Suspense fallback={<LoadingPage />}>
      <ErrorBoundary fallback={<ErrorPage message="Failed to load albums" />}>
        <Await promise={albums} fallback={<ErrorPage />}>
          {(resolvedAlbums) => (
            <AlphabetList
              items={resolvedAlbums}
              namePlural="albums"
              itemRenderer={(album, hide) => (
                <AlbumListItem
                  album={album}
                  hide={hide}
                  href={`./${album.id}`}
                />
              )}
            />
          )}
        </Await>
      </ErrorBoundary>
    </Suspense>
  );
}

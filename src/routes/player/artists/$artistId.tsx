import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import AlbumListItem from "~/components/list-item/AlbumListItem";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getAlbums, getArtist } from "~/lib/server/spotify-data";

const title = "Artists";
export const Route = createFileRoute("/player/artists/$artistId")({
  component: ArtistDetail,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: async ({ params }) => {
    const artist = await getArtist({ data: params.artistId });
    return { headerTitle: artist.name, artist };
  },
  loader: async ({ params }) => {
    return {
      albums: defer(
        getAlbums().then((albums) =>
          albums.filter((album) =>
            album.artists.some((artist) => artist.id === params.artistId),
          ),
        ),
      ),
    };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function ArtistDetail() {
  const { albums } = Route.useLoaderData()();
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load discography" />}
        >
          <Await promise={albums} fallback={<ErrorPage />}>
            {(albumAccessor) => (
              <AlphabetList
                items={() => albumAccessor}
                namePlural="albums"
                hideIndex={true}
                hideItemCount={true}
                itemRenderer={(album, hide) => (
                  <AlbumListItem song={album} hide={hide} />
                )}
              />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

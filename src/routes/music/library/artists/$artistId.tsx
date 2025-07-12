import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import type { HeaderRouteContext } from "~/components/header/Header";
import AlbumListItem from "~/components/list-item/AlbumListItem";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, SKEUOMUSIC, STALE_TIME } from "~/lib/constants";
import { getAlbums, getArtist } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/music/library/artists/$artistId")({
  component: ArtistDetail,
  beforeLoad: async ({ params }) => {
    const artist = await getArtist({ data: params.artistId });
    const header: HeaderRouteContext = {
      title: artist.name,
      backButton: { label: "Artists" },
    };
    return { header, artist };
  },
  loader: async ({ params, context }) => {
    return {
      ...context,
      artist: context.artist,
      albums: defer(
        getAlbums().then((albums) =>
          albums.filter((album) =>
            album.artists.some((artist) => artist.id === params.artistId),
          ),
        ),
      ),
    };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.header?.title ?? SKEUOMUSIC }],
  }),
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function ArtistDetail() {
  const { albums, artist } = Route.useLoaderData()();

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
                  <AlbumListItem
                    album={album}
                    href={`./${album.id}`}
                    hide={hide}
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

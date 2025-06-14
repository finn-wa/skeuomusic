import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getPlaylists } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/playlists")({
  component: Playlists,
  loader: async () => {
    return { playlists: defer(getPlaylists()) };
  },
  head: () => ({ meta: [{ title: "Playlists" }] }),
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Playlists() {
  const { playlists } = Route.useLoaderData()();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load playlists" />}
        >
          <Await promise={playlists} fallback={<ErrorPage />}>
            {(playlistAccessor) => (
              <AlphabetList
                items={() => playlistAccessor}
                namePlural="playlists"
              />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

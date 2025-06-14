import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getArtists } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/artists")({
  component: Artists,
  loader: async () => {
    return { artists: defer(getArtists()) };
  },
  head: () => ({ meta: [{ title: "Artists" }] }),
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Artists() {
  const { artists } = Route.useLoaderData()();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load artists" />}
        >
          <Await promise={artists} fallback={<ErrorPage />}>
            {(artistAccessor) => (
              <AlphabetList items={() => artistAccessor} namePlural="artists" />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

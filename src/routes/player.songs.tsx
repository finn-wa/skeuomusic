import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getSongs } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/songs")({
  component: Songs,
  loader: async () => {
    return { songs: defer(getSongs()) };
  },
  head: () => ({ meta: [{ title: "Songs" }] }),
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Songs() {
  const { songs } = Route.useLoaderData()();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage message="Failed to load songs" />}>
          <Await promise={songs} fallback={<ErrorPage />}>
            {(songAccessor) => (
              <AlphabetList items={() => songAccessor} namePlural="songs" />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

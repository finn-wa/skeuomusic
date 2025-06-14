import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { getArtists } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/artists")({
  component: Artists,
  loader: () => getArtists(),
  head: () => ({ meta: [{ title: "Artists" }] }),
});

export default function Artists() {
  const artists = Route.useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load artists" />}
        >
          <Show when={artists()} fallback={<ErrorPage />}>
            {(artistAccessor) => (
              <AlphabetList items={artistAccessor} namePlural="artists" />
            )}
          </Show>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

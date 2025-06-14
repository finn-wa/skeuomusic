import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { getAlbums } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/albums")({
  component: Albums,
  loader: () => getAlbums(),
  head: () => ({ meta: [{ title: "Albums" }] }),
});

export default function Albums() {
  const albums = Route.useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage message="Failed to load albums" />}>
          <Show when={albums()} fallback={<ErrorPage />}>
            {(albumAccessor) => (
              <AlphabetList items={albumAccessor} namePlural="albums" />
            )}
          </Show>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

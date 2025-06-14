import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { getPlaylists } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/playlists")({
  component: Playlists,
  loader: () => getPlaylists(),
  head: () => ({ meta: [{ title: "Playlists" }] }),
});

export default function Playlists() {
  const playlists = Route.useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load playlists" />}
        >
          <Show when={playlists()} fallback={<ErrorPage />}>
            {(playlistAccessor) => (
              <AlphabetList items={playlistAccessor} namePlural="playlists" />
            )}
          </Show>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { useSpotifyApi } from "~/lib/spotify";
import type { Album } from "~/lib/types";

export const Route = createFileRoute("/player/albums")({
  component: Albums,
  loader: () => getAlbums(),
  head: () => ({ meta: [{ title: "Albums" }] }),
});

const getAlbums = async (): Promise<Album[]> => {
  "use server";
  const api = await useSpotifyApi();
  const response = await api.currentUser.albums.savedAlbums(50, 0);
  return response.items.map(({ album }) => ({
    id: album.id,
    name: album.name,
  }));
};

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

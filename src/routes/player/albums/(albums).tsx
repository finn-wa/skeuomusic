import { type RouteDefinition, createAsync, query } from "@solidjs/router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PageTitle } from "~/components/page-title/PageTitle";
import { useSpotifyApi } from "~/lib/spotify";
import type { Album } from "~/lib/types";

const getAlbums = query(async (): Promise<Album[]> => {
  "use server";
  const api = await useSpotifyApi();
  const response = await api.currentUser.albums.savedAlbums(50, 0);
  return response.items.map(({ album }) => ({
    id: album.id,
    name: album.name,
  }));
}, "albums");

export const route = {
  preload: () => getAlbums(),
} satisfies RouteDefinition;

export default function Albums() {
  const albums = createAsync(() => getAlbums());

  return (
    <>
      <PageTitle>Albums</PageTitle>
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

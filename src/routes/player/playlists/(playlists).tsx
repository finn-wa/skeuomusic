import { type RouteDefinition, createAsync, query } from "@solidjs/router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PageTitle } from "~/components/page-title/PageTitle";
import { useSpotifyApi } from "~/lib/spotify";
import type { Playlist } from "~/lib/types";

const getPlaylists = query(async (): Promise<Playlist[]> => {
  "use server";
  const api = await useSpotifyApi();
  const response = await api.currentUser.playlists.playlists(50, 0);
  return response.items.map(({ id, name }) => ({ id, name }));
}, "playlists");

export const route = {
  preload: () => getPlaylists(),
} satisfies RouteDefinition;

export default function Playlists() {
  const playlists = createAsync(() => getPlaylists());

  return (
    <>
      <PageTitle>Playlists</PageTitle>
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

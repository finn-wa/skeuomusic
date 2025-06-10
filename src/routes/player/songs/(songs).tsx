import { type RouteDefinition, createAsync, query } from "@solidjs/router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PageTitle } from "~/components/page-title/PageTitle";
import { useSpotifyApi } from "~/lib/spotify";
import type { Song } from "~/lib/types";

const getSongs = query(async (): Promise<Song[]> => {
  "use server";
  const api = await useSpotifyApi();
  const response = await api.currentUser.tracks.savedTracks(50, 0);
  return response.items.map(({ track }) => ({
    id: track.id,
    name: track.name,
  }));
}, "songs");

export const route = {
  preload: () => getSongs(),
} satisfies RouteDefinition;

export default function Songs() {
  const songs = createAsync(() => getSongs());

  return (
    <>
      <PageTitle>Songs</PageTitle>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary fallback={<ErrorPage message="Failed to load songs" />}>
          <Show when={songs()} fallback={<ErrorPage />}>
            {(songAccessor) => (
              <AlphabetList items={songAccessor} namePlural="songs" />
            )}
          </Show>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

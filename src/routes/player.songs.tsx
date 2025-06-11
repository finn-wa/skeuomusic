import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { useSpotifyApi } from "~/lib/spotify";
import type { Song } from "~/lib/types";

export const Route = createFileRoute("/player/songs")({
  component: Songs,
  loader: () => getSongs(),
  head: () => ({ meta: [{ title: "Songs" }] }),
});

const getSongs = async (): Promise<Song[]> => {
  "use server";
  const api = await useSpotifyApi();
  const response = await api.currentUser.tracks.savedTracks(50, 0);
  return response.items.map(({ track }) => ({
    id: track.id,
    name: track.name,
  }));
};

export default function Songs() {
  const songs = Route.useLoaderData();

  return (
    <>
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

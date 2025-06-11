import { createFileRoute } from "@tanstack/solid-router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PageTitle } from "~/components/page-title/PageTitle";
import { useSpotifyApi } from "~/lib/spotify";
import type { Artist } from "~/lib/types";

export const Route = createFileRoute("/player/artists")({
  component: Artists,
  loader: () => getArtists(),
});

const getArtists = async (): Promise<Artist[]> => {
  "use server";
  const api = await useSpotifyApi();
  const res = await api.currentUser.followedArtists(undefined, 50);
  return res.artists.items.map(({ id, name }) => ({ id, name }));
};

export default function Artists() {
  const artists = Route.useLoaderData();

  return (
    <>
      <PageTitle>Artists</PageTitle>
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

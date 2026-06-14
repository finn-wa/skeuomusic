import AlphabetList from "@/components/alphabet-list/alphabet-list";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { ErrorPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Item } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import birdItems from "./bird-items-300.json";

const title = "Albums";

async function getAlbums(): Promise<Item[]> {
  return new Promise<Item[]>((resolve) => {
    setTimeout(() => resolve(birdItems), 100);
  });
}

export const Route = createFileRoute("/music/library/albums/")({
  component: AlbumsComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: () => {
    return { albums: getAlbums() };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

function AlbumsComponent() {
  const loaderData = Route.useLoaderData();
  return (
    <ErrorBoundary
      name="AlbumsComponent"
      fallback={<ErrorPage message="An unexpected error occurred" />}
      onError="log"
    >
      <AlphabetList items={loaderData.albums} noun="Album" />
    </ErrorBoundary>
  );
}

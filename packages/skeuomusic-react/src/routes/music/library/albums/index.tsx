import ErrorBoundary from "@/components/error-boundary/error-boundary";
import PageMessage, { ErrorPage, LoadingPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Album } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, use } from "react";

const title = "Albums";

async function getAlbums(): Promise<Album[]> {
  return new Promise<Album[]>((resolve) => {
    setTimeout(() => resolve([]), 2000);
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

function ItemsComponent({ itemsPromise }: { itemsPromise: Promise<unknown[]> }) {
  const items = use(itemsPromise);
  return <PageMessage message={`I love having ${items.length} items`} />;
}

export function AlbumsComponent() {
  const loaderData = Route.useLoaderData();
  return (
    <ErrorBoundary
      name="AlbumsComponent"
      fallback={<ErrorPage message="An unexpected error occurred" />}
      onError="log"
    >
      <Suspense name="LoadAlbums" fallback={<LoadingPage />}>
        <ItemsComponent itemsPromise={loaderData.albums} />
      </Suspense>
    </ErrorBoundary>
  );
}

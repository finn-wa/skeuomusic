import AlphabetList from "@/components/alphabet-list/alphabet-list";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { ErrorPage, LoadingPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Item } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, use } from "react";
import birdItems from "./birdItems.json";
import type { ItemWithLink } from "@/components/list-item/list-item";

const title = "Albums";

async function getAlbums(): Promise<Item[]> {
  return new Promise<Item[]>((resolve) => {
    setTimeout(() => resolve(birdItems), 2000);
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
      <Suspense name="LoadAlbums" fallback={<LoadingPage />}>
        <ItemsComponent itemsPromise={loaderData.albums} />
      </Suspense>
    </ErrorBoundary>
  );
}

function ItemsComponent({ itemsPromise }: { itemsPromise: Promise<ItemWithLink[]> }) {
  const items = use(itemsPromise);
  return <AlphabetList items={items} namePlural="Albums" />;
}

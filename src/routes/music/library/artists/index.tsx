import { Await, createFileRoute, defer } from "@tanstack/solid-router";
import { ErrorBoundary, Suspense } from "solid-js";
import AlphabetList from "~/components/alphabet-list/AlphabetList";
import ListItem from "~/components/list-item/ListItem";
import { ErrorPage, LoadingPage } from "~/components/page-message/PageMessage";
import { PRELOAD_STALE_TIME, STALE_TIME } from "~/lib/constants";
import { getArtists } from "~/lib/server/spotify-data";

const title = "Artists";
export const Route = createFileRoute("/music/library/artists/")({
  component: Artists,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: async () => {
    return { artists: defer(getArtists()) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

export default function Artists() {
  const { artists } = Route.useLoaderData()();

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<ErrorPage message="Failed to load artists" />}
        >
          <Await promise={artists} fallback={<ErrorPage />}>
            {(resolvedArtists) => (
              <AlphabetList
                items={resolvedArtists}
                namePlural="artists"
                itemRenderer={(item, hide) => (
                  <ListItem
                    name={item.name}
                    hide={hide}
                    href={`./${item.id}`}
                  />
                )}
              />
            )}
          </Await>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

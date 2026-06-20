import AlphabetList from "@/components/alphabet-list/alphabet-list";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { ErrorPage, LoginHintPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Item } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import SubsonicAPI from "subsonic-api";

const title = "Albums";

async function getAlbums(api: SubsonicAPI): Promise<Item[]> {
  return api
    .getAlbumList({ type: "alphabeticalByName" })
    .then(
      (res) =>
        res.albumList.album?.map(
          (album): Item => ({ id: album.id, name: album.album ?? "No name" }),
        ) ?? [],
    );
}

export const Route = createFileRoute("/music/library/albums/")({
  component: AlbumsRouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: ({ context }) => {
    const api = context.auth.subsonic.state?.api;
    if (api == null) {
      return { albums: undefined };
    }
    return { albums: getAlbums(api) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

function AlbumsRouteComponent() {
  return (
    <ErrorBoundary name="AlbumsComponent" fallback={<ErrorPage />} onError="log">
      <AlbumsComponent />
    </ErrorBoundary>
  );
}

function AlbumsComponent() {
  const { albums } = Route.useLoaderData();
  if (albums === undefined) {
    return <LoginHintPage />;
  }
  return <AlphabetList items={albums} noun="Album" />;
}

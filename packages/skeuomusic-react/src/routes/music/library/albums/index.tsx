import AlphabetList from "@/components/alphabet-list/alphabet-list";
import AlbumListItem, {
  type AlbumListItemData,
} from "@/components/list-item/album-list-item";
import { LoginHintPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import { createFileRoute } from "@tanstack/react-router";
import SubsonicAPI from "subsonic-api";

const title = "Albums";

async function getAlbums(api: SubsonicAPI): Promise<AlbumListItemData[]> {
  const res = await api.getAlbumList2({ type: "alphabeticalByName" });
  return (
    res.albumList2.album?.map((album): AlbumListItemData => ({
      id: album.id,
      coverArtId: album.coverArt,
      artists: album.artists ?? [],
      name: album.name,
    })) ?? []
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
  const { albums } = Route.useLoaderData();
  if (albums === undefined) {
    return <LoginHintPage />;
  }
  return <AlphabetList itemComponent={AlbumListItem} items={albums} noun="Album" />;
}

import AlphabetList from "@/components/alphabet-list/alphabet-list";
import SongListItem, {
  type SongListItemData,
} from "@/components/list-item/song-list-item";
import { LoginHintPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import { createFileRoute } from "@tanstack/react-router";
import type SubsonicAPI from "subsonic-api";

const title = "Songs";

async function getSongs(api: SubsonicAPI): Promise<SongListItemData[]> {
  const response = await api.search3({
    query: " ",
    songCount: 350,
    artistCount: 0,
    albumCount: 0,
  });
  return (
    response.searchResult3.song?.map(
      (song): SongListItemData => ({
        id: song.id,
        artists: song.artists ?? [],
        album: song.album,
        name: song.title,
      }),
    ) ?? []
  );
}

export const Route = createFileRoute("/music/library/songs")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: ({ context }) => {
    const api = context.auth.subsonic.state?.api;
    if (api == null) {
      return { songs: undefined };
    }
    return { songs: getSongs(api) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

function RouteComponent() {
  const { songs } = Route.useLoaderData();
  if (songs === undefined) {
    return <LoginHintPage />;
  }
  return <AlphabetList itemComponent={SongListItem} items={songs} noun="Song" />;
}

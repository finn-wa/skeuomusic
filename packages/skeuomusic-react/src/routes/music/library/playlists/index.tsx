import AlphabetList from "@/components/alphabet-list/alphabet-list";
import { LoginHintPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Item } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import type SubsonicAPI from "subsonic-api";

const title = "Playlists";

async function getPlaylists(api: SubsonicAPI): Promise<Item[]> {
  const res = await api.getPlaylists();
  return res.playlists.playlist?.map(({ id, name }) => ({ id, name })) ?? [];
}

export const Route = createFileRoute("/music/library/playlists/")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: ({ context }) => {
    const api = context.auth.subsonic.state?.api;
    if (api == null) {
      return { playlists: undefined };
    }
    return { playlists: getPlaylists(api) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

function RouteComponent() {
  const { playlists } = Route.useLoaderData();
  if (playlists === undefined) {
    return <LoginHintPage />;
  }
  return <AlphabetList items={playlists} noun="Playlist" />;
}

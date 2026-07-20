import AlphabetList from "@/components/alphabet-list/alphabet-list";
import { LoginHintPage } from "@/components/page-message/page-message";
import { PRELOAD_STALE_TIME, STALE_TIME } from "@/shared/constants";
import type { Item } from "@/shared/types";
import { createFileRoute } from "@tanstack/react-router";
import type SubsonicAPI from "subsonic-api";

const title = "Artists";

async function getArtists(api: SubsonicAPI): Promise<Item[]> {
  const res = await api.getArtists();
  return (
    res.artists.index?.flatMap(
      ({ artist }) => artist?.map(({ id, name }) => ({ id, name })) ?? [],
    ) ?? []
  );
}

export const Route = createFileRoute("/music/library/artists/")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
  loader: ({ context }) => {
    const api = context.auth.subsonic.state?.api;
    if (api == null) {
      return { artists: undefined };
    }
    return { artists: getArtists(api) };
  },
  staleTime: STALE_TIME,
  preloadStaleTime: PRELOAD_STALE_TIME,
});

function RouteComponent() {
  const { artists } = Route.useLoaderData();
  if (artists === undefined) {
    return <LoginHintPage />;
  }
  return <AlphabetList items={artists} noun="Artist" />;
}

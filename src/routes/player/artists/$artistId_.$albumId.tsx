import { createFileRoute } from "@tanstack/solid-router";
import AlbumDetail from "~/components/album-detail/AlbumDetail";
import { formatArtists } from "~/lib/client/music-utils";
import { SKEUOMUSIC } from "~/lib/constants";
import { getAlbum } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/artists/$artistId_/$albumId")({
  component: AlbumDetailPage,
  beforeLoad: async ({ params, context }) => {
    const album = await getAlbum({ data: params.albumId });
    return { ...context, headerTitle: album.name, album };
  },
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (loaderData == null) {
      return { meta: [{ title: SKEUOMUSIC }] };
    }
    const artists = formatArtists(loaderData.album.artists);
    const albumTitle = loaderData.headerTitle;
    return {
      meta: [{ title: `${albumTitle} - ${artists}` }],
    };
  },
  staleTime: Number.MAX_SAFE_INTEGER,
  preloadStaleTime: Number.MAX_SAFE_INTEGER,
});

export default function AlbumDetailPage() {
  const album = Route.useLoaderData({ select: (data) => data.album })();
  return (
    <div class="content-scroll">
      <AlbumDetail album={album} />
    </div>
  );
}

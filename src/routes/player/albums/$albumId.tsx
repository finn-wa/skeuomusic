import { createFileRoute } from "@tanstack/solid-router";
import AlbumDetail from "~/components/album-detail/AlbumDetail";
import { SKEUOMUSIC } from "~/lib/constants";
import { getAlbum } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/albums/$albumId")({
  component: AlbumDetailPage,
  beforeLoad: async ({ params }) => {
    const album = await getAlbum({ data: params.albumId });
    return { headerTitle: album.name, album };
  },
  loader: ({ context }) => context,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.headerTitle ?? SKEUOMUSIC }],
  }),
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

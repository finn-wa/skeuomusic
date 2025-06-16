import { createFileRoute } from "@tanstack/solid-router";
import AlbumDetail from "~/components/album-detail/AlbumDetail";
import { getAlbum } from "~/lib/server/spotify-data";

export const Route = createFileRoute("/player/albums/$albumId")({
  component: AlbumDetailPage,
  loader: async ({ params }) => {
    const album = await getAlbum({ data: params.albumId });
    return { headerTitle: album.name, album };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.headerTitle ?? "" }],
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

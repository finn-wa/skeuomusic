import AlbumDetail from "@/components/album-detail/album-detail";
import { LoginHintPage } from "@/components/page-message/page-message";
import { SKEUOMUSIC } from "@/shared/constants";
import type { HeaderState } from "@/shared/context/header";
import { toAlbumWithTracklist } from "@/shared/subsonic/subsonic-data-utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music/library/albums/$albumId")({
  component: AlbumDetailPage,
  beforeLoad: async ({ context, params }) => {
    const api = context.auth.subsonic.state?.api;
    if (api == null) {
      return { album: undefined };
    }
    const { album } = await api.getAlbum({ id: params.albumId });
    const header: HeaderState = {
      title: album.name,
      leftButton: { label: "Albums" },
    };
    return { header, album: toAlbumWithTracklist(album) };
  },
  loader: ({ context }) => context,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.header?.title ?? SKEUOMUSIC }],
  }),
  staleTime: Number.MAX_SAFE_INTEGER,
  preloadStaleTime: Number.MAX_SAFE_INTEGER,
});

export default function AlbumDetailPage() {
  const { album } = Route.useLoaderData();
  if (album === undefined) {
    return <LoginHintPage />;
  }
  return (
    <div className="content-scroll">
      <AlbumDetail album={album} />
    </div>
  );
}

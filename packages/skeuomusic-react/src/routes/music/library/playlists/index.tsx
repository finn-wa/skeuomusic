import PageMessage from "@/components/page-message/page-message";
import { createFileRoute } from "@tanstack/react-router";

const title = "Playlists";

export const Route = createFileRoute("/music/library/playlists/")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
});

function RouteComponent() {
  return <PageMessage message="Playlists" />;
}

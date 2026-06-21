import PageMessage from "@/components/page-message/page-message";
import { createFileRoute } from "@tanstack/react-router";

const title = "Artists";

export const Route = createFileRoute("/music/library/artists/")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
});

function RouteComponent() {
  return <PageMessage message="Artists" />;
}

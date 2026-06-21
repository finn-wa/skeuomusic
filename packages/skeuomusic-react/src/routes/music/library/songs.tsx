import PageMessage from "@/components/page-message/page-message";
import { createFileRoute } from "@tanstack/react-router";

const title = "Songs";
export const Route = createFileRoute("/music/library/songs")({
  component: RouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
});

function RouteComponent() {
  return <PageMessage message="Songs" />;
}

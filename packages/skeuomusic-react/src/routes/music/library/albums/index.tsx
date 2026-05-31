import PageMessage from "@/components/page-message/page-message";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music/library/albums/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageMessage message="Albums" />;
}

import { createFileRoute } from "@tanstack/solid-router";
import { Player } from "~/components/player/Player";

export const Route = createFileRoute("/music/player/")({
  component: PlayerRouteComponent,
});

function PlayerRouteComponent() {
  return <Player />;
}

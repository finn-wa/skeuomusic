import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { onMount } from "solid-js";
import { doSpotifyAuth } from "~/lib/client/spotify-auth";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/redirect/spotify")({
  component: SpotifyRedirect,
});

export default function SpotifyRedirect() {
  const navigate = useNavigate({ from: "/redirect/spotify" });

  onMount(async () => {
    const token = await doSpotifyAuth(window.location.origin);
    if (token != null) {
      return navigate({ to: "/player/albums", hash: INITIAL_SCROLL_ID });
    }
    return navigate({ to: "/" });
  });

  return <span>Authorising with Spotify...</span>;
}

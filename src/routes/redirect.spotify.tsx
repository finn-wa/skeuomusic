import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { useAuthContext } from "~/lib/client/auth-context";
import { initSpotifyAuth } from "~/lib/client/spotify-auth";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/redirect/spotify")({
  component: SpotifyRedirect,
});

export default function SpotifyRedirect() {
  const navigate = useNavigate({ from: "/redirect/spotify" });
  const ctx = useAuthContext();

  createEffect(async () => {
    if (isServer) {
      return;
    }
    if (ctx == null) {
      throw new Error("Context not provided");
    }

    console.log("redirect: creating spotify instance");
    const { spotifyAuth, authenticated } = await initSpotifyAuth();
    if (authenticated) {
      console.log("redirect: auth success");
      ctx.setSpotifyAuth(spotifyAuth);
      return navigate({ to: "/music/library/albums", hash: INITIAL_SCROLL_ID });
    }
    console.log("redirect: auth failure");
    return navigate({ to: "/" });
  });

  return <span>Authorising with Spotify...</span>;
}

import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { isEmptyAccessToken } from "spotify-api-client";
import { useAuthContext } from "~/lib/client/auth-context";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/redirect/spotify")({
  component: SpotifyRedirect,
});

export default function SpotifyRedirect() {
  const navigate = useNavigate({ from: "/redirect/spotify" });
  const authContext = useAuthContext();

  createEffect(async () => {
    if (isServer) {
      return;
    }
    const spotifyAuth = authContext.spotifyAuth();
    // trigger any redirects
    const accessToken = await spotifyAuth?.getOrCreateAccessToken();
    const authenticated =
      accessToken != null &&
      accessToken.expires! > Date.now() &&
      !isEmptyAccessToken(accessToken);
    if (authenticated) {
      console.log("redirect: auth success");
      authContext.setSpotifyAuth(spotifyAuth);
      return navigate({ to: "/music/library/albums", hash: INITIAL_SCROLL_ID });
    }
    console.log("redirect: auth failure");
    return navigate({ to: "/" });
  });

  return <span>Authorising with Spotify...</span>;
}

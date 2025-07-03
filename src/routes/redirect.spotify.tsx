import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { createEffect, useContext } from "solid-js";
import { isServer } from "solid-js/web";
import { PlayerContext } from "~/lib/client/player-context";
import { createSpotifyClient } from "~/lib/client/spotify-auth";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/redirect/spotify")({
  component: SpotifyRedirect,
});

export default function SpotifyRedirect() {
  const navigate = useNavigate({ from: "/redirect/spotify" });
  const ctx = useContext(PlayerContext);

  createEffect(async () => {
    if (isServer) {
      return;
    }
    if (ctx == null) {
      throw new Error("Context not provided");
    }

    console.log("redirect: creating spotify instance");
    const { client, authenticated } = await createSpotifyClient();
    if (authenticated) {
      console.log("redirect: auth success");
      ctx.setSpotify(client);
      return navigate({ to: "/player/albums", hash: INITIAL_SCROLL_ID });
    }
    console.log("redirect: auth failure");
    return navigate({ to: "/" });
  });

  return <span>Authorising with Spotify...</span>;
}

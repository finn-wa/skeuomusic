import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { useContext } from "solid-js";
import { PlayerContext } from "~/lib/client/player-context";
import { createSpotifyClient } from "~/lib/client/spotify-auth";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  const navigate = useNavigate({ from: "/" });
  const ctx = useContext(PlayerContext)!;

  async function logInWithSpotify() {
    const { client, authenticated } = await createSpotifyClient();
    if (authenticated) {
      console.log("home: auth success");
      ctx.setSpotify(client);
      return navigate({ to: "/player/albums", hash: INITIAL_SCROLL_ID });
    }
    console.log("home: user cancelled?");
  }

  return (
    <main>
      <h1>welcome to skeuomusic</h1>
      <button onClick={logInWithSpotify} type="button">
        Log in with Spotify
      </button>
    </main>
  );
}

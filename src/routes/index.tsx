import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { useAuthContext } from "~/lib/client/auth-context";
import { initSpotifyAuth } from "~/lib/client/spotify-auth";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  const navigate = useNavigate({ from: "/" });
  const ctx = useAuthContext()!;

  async function logInWithSpotify() {
    const { spotifyAuth, authenticated } = await initSpotifyAuth();
    if (authenticated) {
      console.log("home: auth success");
      ctx.setSpotifyAuth(spotifyAuth);
      return navigate({ to: "/music/library/albums", hash: INITIAL_SCROLL_ID });
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

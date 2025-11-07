import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { isEmptyAccessToken } from "spotify-api-client";
import { useAuthContext } from "~/lib/client/auth-context";
import { INITIAL_SCROLL_ID } from "~/lib/constants";

export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  const navigate = useNavigate({ from: "/" });
  const authContext = useAuthContext();

  async function logInWithSpotify() {
    const accessToken = await authContext
      .spotifyAuth()
      .getOrCreateAccessToken();
    if (isEmptyAccessToken(accessToken) || accessToken.expires! <= Date.now()) {
      console.log("home: user cancelled?");
    } else {
      console.log("home: auth success");
      return navigate({ to: "/music/library/songs", hash: INITIAL_SCROLL_ID });
    }
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

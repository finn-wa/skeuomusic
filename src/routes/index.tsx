import { useNavigate } from "@solidjs/router";
import { doSpotifyAuth } from "~/lib/spotify";

export default function Home() {
  const navigate = useNavigate();
  async function logInWithSpotify() {
    const token = await doSpotifyAuth(window.location.origin);
    if (token != null) {
      return navigate("/player/albums");
    }
    console.log("user cancelled?");
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

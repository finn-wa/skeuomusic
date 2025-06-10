import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { doSpotifyAuth } from "~/lib/spotify";

export default function SpotifyRedirect() {
  const navigate = useNavigate();

  onMount(async () => {
    const token = await doSpotifyAuth(window.location.origin);
    if (token != null) {
      return navigate("/player/albums");
    }
    return navigate("/");
  });

  return <span>Authorising with Spotify...</span>;
}

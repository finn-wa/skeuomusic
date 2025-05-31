import { $, component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { SpotifyAuthContext, spotifyTokenKey } from "./layout";

function log(...obj: unknown[]) {
  console.log("src/routes/index.tsx", ...obj);
}

async function doSpotifyAuth(api: SpotifyApi) {
  const { accessToken, authenticated } = await api.authenticate();
  if (!authenticated) {
    return undefined;
  }
  log("auth complete!");
  localStorage.setItem(spotifyTokenKey, JSON.stringify(accessToken));
  return accessToken;
}

/**
 * login page for when spotify auth is not present.
 * - initiates auth flow on button press
 * - saves token to localStorage
 * - sets spotifyAuth.token
 * - redirects to player
 */
export default component$(() => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useVisibleTask$(async () => {
    if (spotifyAuth.api == null) {
      throw new Error("layout should have provided api");
    }
    if (spotifyAuth.token != null) {
      log("api already initialized, going to albums");
      return navigate("/player/albums");
    }
    if (location.url.searchParams.get("code") != null) {
      log("we've returned from a callback");
      spotifyAuth.token = await doSpotifyAuth(spotifyAuth.api);
      if (spotifyAuth.token != null) {
        log("it was successful");
        return navigate("/player/albums");
      }
      log("User did not authorize");
    }
    log("Waiting for user to log in");
  });

  const performSpotifyAuth = $(async () => {
    const api = spotifyAuth.api;
    if (api == null) {
      throw new Error("API undefined");
    }
    await doSpotifyAuth(api);
  });

  return (
    <>
      <h1>skeuomusic</h1>
      <button type="button" onClick$={performSpotifyAuth}>
        Login with Spotify
      </button>
    </>
  );
});

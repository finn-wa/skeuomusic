import { $, component$ } from "@builder.io/qwik";
import {
  RequestHandler,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import type { AccessToken } from "@spotify/web-api-ts-sdk";
import { doSpotifyAuth } from "~/server/spotify";

function log(...obj: unknown[]) {
  console.log("src/routes/login/index.tsx", ...obj);
}

export const onRequest: RequestHandler = async ({ sharedMap, cookie }) => {
  const accessToken = cookie.get("spotify_token")?.json();
  if (accessToken != null) {
    sharedMap.set("spotifyToken", accessToken as AccessToken);
  }
};

export const useSpotifyToken = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("spotifyToken") as AccessToken | undefined;
});

/**
 * login page for when spotify auth is not present.
 * - initiates auth flow on button press
 * - saves token to localStorage
 * - sets spotifyAuth.token
 * - redirects to player
 */
export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const performSpotifyAuth = $(async () => {
    const onAuthFailed = () => {
      log("auth failed, back to /login");
      navigate("/login");
    };
    const token = await doSpotifyAuth(location.url, onAuthFailed);
    if (token != null) {
      log("ok sdk took care of it");
      return navigate("/player/albums");
    }
    log("it didn't work");
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

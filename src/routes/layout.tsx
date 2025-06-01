import {
  type NoSerialize,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type {
  AccessToken,
  SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import {
  getSpotifyApiWithToken,
  getSpotifyApiWithoutToken,
} from "~/server/spotify";

export type SpotifyAuthState = {
  token?: AccessToken;
  api?: NoSerialize<SpotifyApi>;
};
export const SpotifyAuthContext = createContextId<SpotifyAuthState>("spotify");
export const spotifyTokenKey = "spotifyToken";

function getTokenFromLocalStorage(): AccessToken | undefined {
  const value = localStorage.getItem(spotifyTokenKey);
  if (value == null) {
    return undefined;
  }
  return JSON.parse(value);
}

function log(...obj: unknown[]) {
  console.log("src/routes/layout.tsx", ...obj);
}

/**
 * wraps all pages and provides spotify API instance via the SpotifyAuthContext.
 * - gets auth token from localStorage if present, sets spotifyAuth.token
 * - otherwise provides unauthenticated api instance
 * - sets spotifyAuth.api
 */
export default component$(() => {
  const spotifyAuth = useStore<SpotifyAuthState>({});
  useContextProvider(SpotifyAuthContext, spotifyAuth);
  const location = useLocation();
  const navigate = useNavigate();

  useVisibleTask$(async () => {
    const onAuthFailed = () => {
      localStorage.removeItem(spotifyTokenKey);
      spotifyAuth.api = noSerialize(
        getSpotifyApiWithoutToken(location.url, onAuthFailed),
      );
      spotifyAuth.token = undefined;
      navigate("/");
    };
    const options: SdkOptions = {};
    if (spotifyAuth.token == null) {
      log("attempting to get token from localStorage");
      spotifyAuth.token = getTokenFromLocalStorage();
    }
    if (spotifyAuth.token == null) {
      spotifyAuth.api = noSerialize(
        getSpotifyApiWithoutToken(location.url, onAuthFailed),
      );
      if (location.url.pathname !== "/") {
        log("going to / for auth");
        return navigate("/");
      }
      log("waiting for auth from /");
      return;
    }
    log("instantiating api");
    spotifyAuth.api = noSerialize(
      getSpotifyApiWithToken(spotifyAuth.token, onAuthFailed),
    );
  });

  return <Slot />;
});

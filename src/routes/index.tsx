import {
  $,
  type NoSerialize,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  getSpotifyAccessToken,
  getSpotifyApiWithToken,
  getSpotifyApiWithoutToken,
} from "~/server/spotify";
import { spotifyTokenKey } from "./auth";

// login page that makes sure you have spotify authenticated

export type SpotifyAuthState = {
  token?: AccessToken;
  api?: NoSerialize<SpotifyApi>;
};
export const SpotifyAuthContext = createContextId<SpotifyAuthState>("spotify");

function getTokenFromLocalStorage(): AccessToken | undefined {
  const value = localStorage.getItem(spotifyTokenKey);
  if (value == null) {
    return undefined;
  }
  return JSON.parse(value);
}

async function doSpotifyAuth(api: SpotifyApi, spotifyAuth: SpotifyAuthState) {
  const { accessToken, authenticated } = await api.authenticate();
  if (!authenticated) {
    console.log("user refused auth");
  } else {
    console.log("auth complete!");
    spotifyAuth.token = accessToken;
    localStorage.setItem(spotifyTokenKey, JSON.stringify(accessToken));
  }
}

export default component$(() => {
  const spotifyAuth = useStore<SpotifyAuthState>({});
  useContextProvider(SpotifyAuthContext, spotifyAuth);
  const location = useLocation();

  useVisibleTask$(async () => {
    if (spotifyAuth.api != null) {
      console.log("api already initialized");
      return;
    }
    const origin = location.url.origin;
    const clientId: string | undefined = import.meta.env
      .PUBLIC_SPOTIFY_CLIENT_ID;
    if (clientId == null) {
      throw new Error("Spotify client ID env variable is not defined");
    }
    const redirect = `${origin}/`;
    if (spotifyAuth.token == null) {
      console.log("attempting to get token from localStorage");
      spotifyAuth.token = getTokenFromLocalStorage();
    } else {
      console.log("token already present");
    }
    let api: SpotifyApi;
    console.log("Instantiating api");
    if (spotifyAuth.token == null) {
      console.log("no token");
      api = getSpotifyApiWithoutToken(clientId, redirect);
      if (location.url.searchParams.get("code") != null) {
        console.log("we've returned from a callback");
        await doSpotifyAuth(api, spotifyAuth);
      }
    } else {
      console.log("existing token");
      api = getSpotifyApiWithToken(clientId, spotifyAuth.token);
    }
    spotifyAuth.api = noSerialize(api);
  });

  const performSpotifyAuth = $(async () => {
    const api = spotifyAuth.api;
    if (api == null) {
      throw new Error("API undefined");
    }
    await doSpotifyAuth(api, spotifyAuth);
  });

  return (
    <>
      <h1>skeuomusic</h1>
      <button type="button" onClick$={performSpotifyAuth}>
        Auth
      </button>
      <span>token: {spotifyAuth.token?.access_token ?? "None"} </span>
    </>
  );
});

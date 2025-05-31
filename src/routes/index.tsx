import { $, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  SpotifyAuthContext,
  type SpotifyAuthState,
  type SpotifyToken,
  spotifyTokenKey,
} from "./layout";

export default component$(() => {
  const spotifyAuth = useStore<SpotifyAuthState>({});
  useContextProvider(SpotifyAuthContext, spotifyAuth);

  const origin = useLocation().url.origin;
  const redirect = `${origin}/`;
  const postBack = `${origin}/`;
  const performSpotifyAuth = $(async () => {
    const clientId: string | undefined = import.meta.env
      .PUBLIC_SPOTIFY_CLIENT_ID;
    if (clientId == null) {
      throw new Error("Spotify client ID env variable is not defined");
    }
    const result = await SpotifyApi.performUserAuthorization(
      clientId,
      redirect,
      ["user-library-read"],
      postBack,
    );
    if (!result.authenticated) {
      console.log("Didn't authenticate", result.accessToken);
      // user is now logging in
      // postback not called, you just get an access token via code query param
      // that's enough to instantiate the sdk
      // to get the expiry and auto-refresh you can call .authenticate() afterwards
    } else {
      // if it's valid you get the token here
      const spotifyToken = { ...result.accessToken, timestamp: Date.now() };
      console.log("Authenticated", spotifyToken);
      spotifyAuth.token = spotifyToken;
      localStorage.setItem(spotifyTokenKey, JSON.stringify(spotifyToken));
    }
  });

  return (
    <>
      <h1>skeuomusic</h1>
      <button type="button" onClick$={performSpotifyAuth}>
        Auth
      </button>
    </>
  );
});

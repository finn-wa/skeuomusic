import { routeLoader$, server$ } from "@builder.io/qwik-city";
import {
  type AccessToken,
  AuthorizationCodeWithPKCEStrategy,
  DocumentLocationRedirectionStrategy,
  type SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";

// const clientID = process.env.PUBLIC_SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// if (clientID === undefined) {
//   throw new Error("SPOTIFY_CLIENT_ID env variable is undefined");
// }
// if (clientSecret === undefined) {
//   throw new Error("SPOTIFY_CLIENT_SECRET env variable is undefined");
// }
// export const spotify = SpotifyApi.withAccessToken("clientId", {
//   access_token: "",
//   expires_in: -1,
//   refresh_token: "",
//   token_type: "Bearer",
// }, { }).authenticate();

const scopes = () => ["user-library-read"];
const options = (): SdkOptions => ({
  redirectionStrategy: {
    async onReturnFromRedirect() {
      console.log("I'm back from redirect");
    },
    async redirect(targetUrl) {
      console.log(`Opening ${targetUrl}`);
      document.location = targetUrl.toString();
    },
  },
});

export function getSpotifyApiWithoutToken(
  clientId: string,
  redirect: string,
): SpotifyApi {
  return new SpotifyApi(
    new AuthorizationCodeWithPKCEStrategy(clientId, redirect, scopes()),
    options(),
  );
}

export function getSpotifyApiWithToken(
  clientId: string,
  token: AccessToken,
): SpotifyApi {
  return SpotifyApi.withAccessToken(clientId, token, options());
}

/** Returns Spotify access token (or null if user declines to authenticate). */
export async function getSpotifyAccessToken(
  api: SpotifyApi,
): Promise<AccessToken | null> {
  const at = await api.getAccessToken();
  if (at != null) {
    console.log({ at });
    return at;
  }
  const result = await api.authenticate();

  // await SpotifyApi.performUserAuthorization(
  //   clientId,
  //   redirect,
  //   scopes,
  //   async (token) => {
  //     console.log("received postback token", token);
  //   },
  //   options,
  // );
  if (!result.authenticated) {
    console.log("Didn't authenticate", result.accessToken);
    return null;
    // user is now logging in
    // postback not called, you just get an access token via code query param
    // that's enough to instantiate the sdk
    // to get the expiry and auto-refresh you can call .authenticate() afterwards
  }
  // if it's valid you get the token here
  return result.accessToken;
}

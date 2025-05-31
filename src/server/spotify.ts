import {
  type AccessToken,
  AuthorizationCodeWithPKCEStrategy,
  type SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";

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
const clientId = () => {
  const clientId: string | undefined = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID;
  if (clientId == null) {
    throw new Error("Spotify client ID env variable is not defined");
  }
  return clientId;
};

export function getSpotifyApiWithoutToken(currentUrl: URL): SpotifyApi {
  const redirect = `${currentUrl.origin}/`;
  return new SpotifyApi(
    new AuthorizationCodeWithPKCEStrategy(clientId(), redirect, scopes()),
    options(),
  );
}

export function getSpotifyApiWithToken(token: AccessToken): SpotifyApi {
  return SpotifyApi.withAccessToken(clientId(), token, options());
}

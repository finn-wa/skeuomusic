import {
  type AccessToken,
  AuthorizationCodeWithPKCEStrategy,
  type SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";

const scopes = () => ["user-library-read", "user-follow-read"];
const options = (onAuthFailed: () => void): SdkOptions => ({
  afterRequest: (_url, _options, response) => {
    if (response.ok) {
      return;
    }
    if (response.status === 400) {
      onAuthFailed();
    }
    console.log("Unrecognised Spotify error response", response);
  },
  errorHandler: {
    handleErrors: async (error: Error) => {
      console.error("Received error from Spotify SDK", error);
      // Can't always use afterRequest to handle this because of a bug in spotify SDK
      if (error.message.includes("invalid_grant")) {
        onAuthFailed();
      }
      return true; // Tells the SDK not to throw it
    },
  },
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

export function getSpotifyApiWithoutToken(
  currentUrl: URL,
  onAuthFailed: () => void,
): SpotifyApi {
  const redirect = `${currentUrl.origin}/`;
  return new SpotifyApi(
    new AuthorizationCodeWithPKCEStrategy(clientId(), redirect, scopes()),
    options(onAuthFailed),
  );
}

export function getSpotifyApiWithToken(
  token: AccessToken,
  onAuthFailed: () => void,
): SpotifyApi {
  const api = SpotifyApi.withAccessToken(
    clientId(),
    token,
    options(onAuthFailed),
  );
  return api;
}

import {
  isEmptyAccessToken,
  type SpotifyAuth,
  spotifyAuthViaCodeWithPkce,
} from "spotify-api-client";
import { SPOTIFY_SCOPES } from "../constants";

export async function initSpotifyAuth(
  origin = window.location.origin,
): Promise<{ authenticated: boolean; spotifyAuth: SpotifyAuth }> {
  const spotifyAuth = spotifyAuthViaCodeWithPkce({
    clientId: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    redirectUri: `${origin}/redirect/spotify`,
    scopes: SPOTIFY_SCOPES(),
  });
  // trigger any redirects
  const accessToken = await spotifyAuth.getOrCreateAccessToken();
  const authenticated =
    accessToken.expires! > Date.now() && !isEmptyAccessToken(accessToken);

  if (authenticated) {
    console.log("Posting access token to postback URL.");
    await fetch(`${origin}/api/spotify/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessToken),
    });
  }
  return { authenticated, spotifyAuth };
}

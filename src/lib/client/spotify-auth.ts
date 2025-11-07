import {
  type SpotifyAccessToken,
  type SpotifyAuth,
  spotifyAuthViaCodeWithPkce,
} from "spotify-api-client";
import { SPOTIFY_SCOPES } from "../constants";

export function createSpotifyAuth(
  origin = window.location.origin,
): SpotifyAuth {
  const spotifyAuth = spotifyAuthViaCodeWithPkce({
    clientId: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    redirectUri: `${origin}/redirect/spotify`,
    scopes: SPOTIFY_SCOPES(),
  });
  let token: SpotifyAccessToken | undefined;
  return {
    getOrCreateAccessToken: async () => {
      const nextToken = await spotifyAuth.getOrCreateAccessToken();
      if (nextToken?.access_token !== token?.access_token) {
        await fetch(`${origin}/api/spotify/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextToken),
        });
      }
      token = nextToken;
      return nextToken;
    },
    getAccessToken: () => spotifyAuth.getAccessToken(),
    removeAccessToken: () => spotifyAuth.removeAccessToken(),
  };
}

import {
  AuthorizationCodeWithPKCEStrategy,
  getDefaultCachingStrategy,
  type SpotifyAccessToken,
  type SpotifyAuth,
  spotifyAuthViaCodeWithPkce,
} from "spotify-api-client";
import { SPOTIFY_SCOPES } from "../constants";

export function createSpotifyAuth(
  origin = window.location.origin,
): SpotifyAuth {
  const cachingStrategy = getDefaultCachingStrategy({
    expiryWindow: 300000,
    interval: 360000,
  });
  const updateListener = async (token: SpotifyAccessToken | null) => {
    if (token == null) {
      console.log("Spotify token removed from cache");
      return;
    }
    console.log("Posting Spotify access token to server");
    await fetch(`${origin}/api/spotify/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });
  };
  const cacheKey = AuthorizationCodeWithPKCEStrategy.cacheKey;
  cachingStrategy.addUpdateListener(cacheKey, updateListener);
  cachingStrategy.get<SpotifyAccessToken>(cacheKey).then((token) => {
    if (token != null) {
      updateListener(token);
    }
  });
  return spotifyAuthViaCodeWithPkce({
    clientId: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    redirectUri: `${origin}/redirect/spotify`,
    scopes: SPOTIFY_SCOPES(),
    cachingStrategy,
  });
}

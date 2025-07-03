import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { SPOTIFY_SCOPES } from "../constants";

export async function createSpotifyClient(
  origin = window.location.origin,
): Promise<{ authenticated: boolean; client: SpotifyApi }> {
  const client = SpotifyApi.withUserAuthorization(
    import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    `${origin}/redirect/spotify`,
    SPOTIFY_SCOPES(),
  );
  const { authenticated, accessToken } = await client.authenticate();
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
  return { authenticated, client };
}

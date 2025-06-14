import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { SPOTIFY_SCOPES } from "../constants";

export async function doSpotifyAuth(origin: string) {
  const postback = `${origin}/api/spotify/auth`;
  const redirect = `${origin}/redirect/spotify`;
  console.log({ clientId: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID });
  const { accessToken, authenticated } =
    await SpotifyApi.performUserAuthorization(
      import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
      redirect,
      SPOTIFY_SCOPES(),
      postback,
    );
  if (!authenticated) {
    console.log("auth failed");
    return undefined;
  }
  console.log("auth success");
  return accessToken;
}

import { type AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSession } from "vinxi/http";

export type SpotifySession = AccessToken;

export async function useSpotifySession() {
  "use server";
  return useSession<SpotifySession>({
    password: process.env.SESSION_SECRET as string,
    name: "spotify_token",
  });
}

const scopes = () => ["user-library-read", "user-follow-read"];

function clientId() {
  const clientId: string | undefined = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID;
  if (clientId == null) {
    throw new Error("PUBLIC_SPOTIFY_CLIENT_ID env variable is not defined");
  }
  return clientId;
}

export function getSpotifyApiWithToken(token: AccessToken): SpotifyApi {
  return SpotifyApi.withAccessToken(clientId(), token);
}

export function getSpotifyApiWithCode(code: string): SpotifyApi {
  return SpotifyApi.withAccessToken(clientId(), {
    access_token: code,
    expires_in: 360_000,
    refresh_token: "",
    token_type: "Bearer",
  });
}

export async function useSpotifyApi(): Promise<SpotifyApi> {
  const token = await useSpotifySession();
  return getSpotifyApiWithToken(token.data);
}

export async function doSpotifyAuth(origin: string) {
  const postback = `${origin}/api/spotify/auth`;
  const redirect = `${origin}/redirect/spotify`;
  const { accessToken, authenticated } =
    await SpotifyApi.performUserAuthorization(
      clientId(),
      redirect,
      scopes(),
      postback,
    );
  if (!authenticated) {
    console.log("auth failed");
    return undefined;
  }
  console.log("auth success");
  return accessToken;
}

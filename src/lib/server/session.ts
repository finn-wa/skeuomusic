import type { AccessToken } from "@spotify/web-api-ts-sdk";
import { useSession } from "@tanstack/solid-start/server";

export type SpotifySession = {
  token?: AccessToken & Required<Pick<AccessToken, "expires">>;
};

export async function useSpotifySession() {
  return useSession<SpotifySession>({
    password: process.env.SESSION_SECRET as string,
    name: "spotify_token",
  });
}

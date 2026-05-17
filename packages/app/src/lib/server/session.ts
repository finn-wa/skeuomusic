import { useSession } from "@tanstack/solid-start/server";
import type { SpotifyAccessToken } from "spotify-api-client";

export type SpotifySession = {
  token?: SpotifyAccessToken & Required<Pick<SpotifyAccessToken, "expires">>;
};

export async function useSpotifySession() {
  return useSession<SpotifySession>({
    password: process.env.SESSION_SECRET as string,
    name: "spotify_token",
  });
}

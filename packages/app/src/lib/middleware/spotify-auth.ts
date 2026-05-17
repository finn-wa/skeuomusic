import { redirect } from "@tanstack/solid-router";
import { createMiddleware } from "@tanstack/solid-start";
import {
  emptyAccessToken,
  spotifyAuthViaProvidedAccessToken,
} from "spotify-api-client";
import { useSpotifySession } from "../server/session";

export const spotifyApiMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const session = await useSpotifySession();
  if (session.data?.token == null) {
    console.log("spotify token missing");
    throw redirect({ to: "/" });
  }
  const spotifyAuth = spotifyAuthViaProvidedAccessToken(session.data.token, {
    clientId: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    refreshTokenAction: async () => {
      console.error("Cannot refresh token on server-side");
      return emptyAccessToken;
    },
  });
  return next({ context: { spotifyAuth } });
});

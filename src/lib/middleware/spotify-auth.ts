import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { redirect } from "@tanstack/solid-router";
import { createMiddleware } from "@tanstack/solid-start";
import { useSpotifySession } from "../server/session";

export const spotifyApiMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const session = await useSpotifySession();
  if (session.data?.token == null) {
    console.log("spotify token missing");
    throw redirect({
      to: "/",
    });
  }
  const api = SpotifyApi.withAccessToken(
    import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    session.data.token,
  );
  return next({ context: { api } });
});

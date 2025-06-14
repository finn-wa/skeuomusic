import type { AccessToken } from "@spotify/web-api-ts-sdk";
import { createServerFileRoute } from "@tanstack/solid-start/server";
import { useSpotifySession } from "~/lib/server/session";

/** Receives postback from Spotify auth */
export const ServerRoute = createServerFileRoute("/api/spotify/auth").methods({
  POST: async ({ request }) => {
    const token: AccessToken | undefined = await request.json();
    if (
      token?.access_token == null ||
      token.refresh_token == null ||
      token.expires_in == null
    ) {
      console.error(
        "Access token not in expected format",
        JSON.stringify(token, null, 2),
      );
      return new Response("Invalid JSON body", { status: 400 });
    }
    const spotifySession = await useSpotifySession();
    await spotifySession.update(token);
    return new Response(null, { status: 210 });
  },
});

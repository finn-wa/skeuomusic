import type { APIEvent } from "@solidjs/start/server";
import type { AccessToken } from "@spotify/web-api-ts-sdk";
import { useSpotifySession } from "~/lib/spotify";

/** Receives postback from Spotify auth */
export async function POST({ request }: APIEvent) {
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
  console.log("received spotify postback", JSON.stringify(token));
  await spotifySession.update(token);
  return new Response(null, { status: 210 });
}

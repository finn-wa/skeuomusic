import type { RequestHandler } from "@builder.io/qwik-city";
import type { AccessToken } from "@spotify/web-api-ts-sdk";

export type SpotifyToken = AccessToken & {
  timestamp: number;
};

export const spotifyTokenKey = "spotifyToken";

/**
 * Receives callback from Spotify. Sets token in sharedMap.
 */
export const onPost: RequestHandler = async ({
  parseBody,
  sharedMap,
  status,
}) => {
  const body = (await parseBody()) as AccessToken;
  if (
    typeof body?.access_token !== "string" ||
    typeof body?.refresh_token !== "string"
  ) {
    status(400);
    console.log(`Unexpected POST body: ${JSON.stringify(body, null, 2)}`);
    return;
  }
  const token: SpotifyToken = { ...body, timestamp: Date.now() };
  console.log(
    `Updating sharedMap.${spotifyTokenKey}: ${JSON.stringify(token, null, 2)}`,
  );
  sharedMap.set(spotifyTokenKey, token);
  status(210);
};

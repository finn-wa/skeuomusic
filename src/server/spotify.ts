import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
if (clientID === undefined) {
  throw new Error("SPOTIFY_CLIENT_ID env variable is undefined");
}
if (clientSecret === undefined) {
  throw new Error("SPOTIFY_CLIENT_SECRET env variable is undefined");
}
export const spotify = SpotifyApi.withClientCredentials(clientID, clientSecret);

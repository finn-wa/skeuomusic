import { Slot, component$, createContextId } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import "@fontsource-variable/inter";
import type { AccessToken } from "@spotify/web-api-ts-sdk";
import { Header } from "~/components/header/header";
import { TabBar } from "~/components/tab-bar/tab-bar";

export type SpotifyToken = AccessToken & {
  timestamp: number;
};

export const spotifyTokenKey = "spotifyToken";

// already authenticated: callback is called

// we get redirected back here with a code param
//

/**
 * Receives callback from Spotify. Sets token in sharedMap.
 */
export const onPost: RequestHandler = async ({
  parseBody,
  sharedMap,
  status,
}) => {
  const body = (await parseBody()) as AccessToken;
  console.log({ post: body });
  // if (
  // typeof body?.access_token !== "string" ||
  // typeof body?.refresh_token !== "string"
  // ) {
  // status(400);
  // console.log(`Unexpected POST body: ${JSON.stringify(body, null, 2)}`);
  // return;
  // }
  // const token: SpotifyToken = { ...body, timestamp: Date.now() };
  // console.log(
  // `Updating sharedMap.${spotifyTokenKey}: ${JSON.stringify(token, null, 2)}`,
  // );
  // sharedMap.set(spotifyTokenKey, token);
  // status(210);
};

export type SpotifyAuthState = {
  token?: SpotifyToken;
};
export const SpotifyAuthContext = createContextId<SpotifyAuthState>("spotify");

const spotifyTokenCookie = "spotify_token";

function getNewestToken(
  a: SpotifyToken | undefined,
  b: SpotifyToken | undefined,
): SpotifyToken | null {
  if (a == null || b == null) {
    return a ?? b ?? null;
  }
  return a.timestamp > b.timestamp ? a : b;
}

// this bit isn't working... i guess the callback should be this page and not /auth?

/**
 * Watches the sharedMap for the spotify token from auth endpoint.
 * Watches the cookie for cached token values.
 * Updates both to the latest value.
 */
export const onGet: RequestHandler = ({ query, cookie, sharedMap }) => {
  const cookieToken = cookie.get(spotifyTokenCookie)?.json<SpotifyToken>();
  const mapToken = sharedMap.get(spotifyTokenKey) as SpotifyToken | undefined;
  if (cookieToken?.timestamp === mapToken?.timestamp) {
    return;
  }
  const newestToken = getNewestToken(cookieToken, mapToken);
  if (newestToken == null) {
    return;
  }
  if (newestToken === cookieToken) {
    sharedMap.set(spotifyTokenKey, newestToken);
    return;
  }
  if (newestToken === mapToken) {
    cookie.set(spotifyTokenCookie, newestToken, {
      maxAge: newestToken.expires_in,
    });
    return;
  }
};

const useSpotifyToken = routeLoader$(({ sharedMap }) => {
  return sharedMap.get(spotifyTokenKey) as SpotifyToken | null;
});

export default component$(() => {
  const token = useSpotifyToken();
  return (
    <div class="page">
      <Header />
      <div class="content">
        {token.value?.access_token ?? "no token"}
        <Slot />
      </div>
      <TabBar />
    </div>
  );
});

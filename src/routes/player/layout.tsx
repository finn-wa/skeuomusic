import {
  NoSerialize,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  RequestHandler,
  routeLoader$,
  useNavigate,
} from "@builder.io/qwik-city";
import "@fontsource-variable/inter";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Header } from "~/components/header/header";
import { NavTabBar } from "~/components/nav-tab-bar/nav-tab-bar";
import { getSpotifyApiWithToken } from "~/server/spotify";

export type SpotifyAuthState = {
  token?: AccessToken;
  api: NoSerialize<SpotifyApi>;
};
export const SpotifyAuthContext = createContextId<SpotifyAuthState>("spotify");

export const onRequest: RequestHandler = async ({
  sharedMap,
  cookie,
  redirect,
}) => {
  const accessToken = (cookie.get("spotify_token")?.json() ??
    null) as AccessToken | null;
  if (accessToken != null) {
    sharedMap.set("spotifyToken", accessToken);
    sharedMap.set(
      "spotifyApi",
      getSpotifyApiWithToken(accessToken, () => console.log("auth is over :(")),
    );
    return;
  }
  console.log("spotify token cookie is missing");
  throw redirect(302, "/login");
};

export const useSpotifyToken = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("spotifyToken") as AccessToken;
});

/**
 * Provides header and nav tab bar for /player routes
 */
export default component$(() => {
  const navigate = useNavigate();
  const spotifyToken = useSpotifyToken();
  const spotifyAuth = useStore<SpotifyAuthState>({
    token: spotifyToken.value,
    api: noSerialize(
      getSpotifyApiWithToken(spotifyToken.value, () => {
        console.log("auth expired");
        return navigate("/login");
      }),
    ),
  });
  useContextProvider(SpotifyAuthContext, spotifyAuth);
  useVisibleTask$(() => {
    if (spotifyAuth.api == null) {
      spotifyAuth.api = noSerialize(
        getSpotifyApiWithToken(spotifyToken.value, () => {
          console.log("auth expired");
          return navigate("/login");
        }),
      );
    }
  });

  return (
    <div class="page">
      <Header />
      <div class="content">
        <Slot />
      </div>
      <NavTabBar />
    </div>
  );
});

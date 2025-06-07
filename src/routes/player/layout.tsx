import {
  NoSerialize,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
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
import { APP_STATE, AppState } from "~/constants";
import { getSpotifyApiWithToken } from "~/providers/spotify";

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
  if (
    accessToken?.access_token === sharedMap.get("spotifyToken")?.access_token
  ) {
    return;
  }
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

function getSpotifyApi(sharedMap: Map<string, unknown>) {
  const spotify = sharedMap.get("spotifyApi") as SpotifyApi | null;
  if (spotify == null) {
    throw new Error("spotify sdk undefined");
  }
  return spotify;
}

export const useAlbumsLoader = routeLoader$(async ({ sharedMap }) => {
  console.log("loading albums");
  const api = getSpotifyApi(sharedMap);
  const res = await api.currentUser.albums.savedAlbums(50, 0);
  return res.items.map(({ album }) => ({ key: album.id, title: album.name }));
});

export const useArtistsLoader = routeLoader$(async ({ sharedMap }) => {
  console.log("loading artists");
  const api = getSpotifyApi(sharedMap);
  const res = await api.currentUser.followedArtists(undefined, 50);
  return res.artists.items.map(({ id, name }) => ({ key: id, title: name }));
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

  const artistsSignal = useArtistsLoader();
  const albumsSignal = useAlbumsLoader();
  const appState = useStore<AppState>({
    albums: albumsSignal.value ?? [],
    artists: artistsSignal.value ?? [],
  });
  useContextProvider(APP_STATE, appState);

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

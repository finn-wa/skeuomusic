import {
  type AccessToken,
  type Album,
  AuthorizationCodeWithPKCEStrategy,
  type FollowedArtists,
  type Page,
  type SavedAlbum,
  type SavedTrack,
  type SdkOptions,
  type SimplifiedPlaylist,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import albums from "./mock-data/albums.json";
import followedArtists from "./mock-data/followedArtists.json";
import playlists from "./mock-data/playlists.json";
import savedAlbums from "./mock-data/savedAlbums.json";
import savedTracks from "./mock-data/savedTracks.json";

const scopes = () => ["user-library-read", "user-follow-read"];
const options = (onAuthFailed: () => void): SdkOptions => ({
  afterRequest: (_url, _options, response) => {
    if (response.ok) {
      return;
    }
    if (response.status === 400) {
      onAuthFailed();
    }
    console.log("Unrecognised Spotify error response", response);
  },
  errorHandler: {
    handleErrors: async (error: Error) => {
      console.error("Received error from Spotify SDK", error);
      // Can't always use afterRequest to handle this because of a bug in spotify SDK
      if (error.message.includes("invalid_grant")) {
        onAuthFailed();
      }
      return true; // Tells the SDK not to throw it
    },
  },
  redirectionStrategy: {
    async onReturnFromRedirect() {
      console.log("I'm back from redirect");
    },
    async redirect(targetUrl) {
      console.log(`Opening ${targetUrl}`);
      document.location = targetUrl.toString();
    },
  },
});
const clientId = () => {
  const clientId: string | undefined = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID;
  if (clientId == null) {
    throw new Error("Spotify client ID env variable is not defined");
  }
  return clientId;
};

export function getSpotifyApiWithoutToken(
  currentUrl: URL,
  onAuthFailed: () => void,
): SpotifyApi {
  const redirect = `${currentUrl.origin}/auth/redirect`;
  return new SpotifyApi(
    new AuthorizationCodeWithPKCEStrategy(clientId(), redirect, scopes()),
    options(onAuthFailed),
  );
}

export function getSpotifyApiWithToken(
  token: AccessToken,
  onAuthFailed: () => void,
): SpotifyApi {
  const api = SpotifyApi.withAccessToken(
    clientId(),
    token,
    options(onAuthFailed),
  );
  return api;
}

export async function doSpotifyAuth(currentUrl: URL, onAuthFailed: () => void) {
  const postback = `${currentUrl.origin}/auth`;
  const redirect = `${currentUrl.origin}/auth/redirect`;
  const { accessToken, authenticated } =
    await SpotifyApi.performUserAuthorization(
      clientId(),
      redirect,
      scopes(),
      postback,
      options(onAuthFailed),
    );
  if (!authenticated) {
    console.log("auth failed");
    return undefined;
  }
  console.log("auth success");
  return accessToken;
}

type MockSpotifyApi = {
  albums: Pick<SpotifyApi["albums"], "get">;
  currentUser: {
    albums: Pick<SpotifyApi["currentUser"]["albums"], "savedAlbums">;
    playlists: Pick<SpotifyApi["currentUser"]["playlists"], "playlists">;
    followedArtists: SpotifyApi["currentUser"]["followedArtists"];
    tracks: Pick<SpotifyApi["currentUser"]["tracks"], "savedTracks">;
  };
};

export const mockSpotifyApi = (): MockSpotifyApi => {
  const mockResponse = <T>(res: unknown) => {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(res as T), 100);
    });
  };
  return {
    albums: {
      get: (() => mockResponse<Album>(albums[0])) as any,
    },
    currentUser: {
      albums: {
        savedAlbums: () => mockResponse<Page<SavedAlbum>>(savedAlbums),
      },
      playlists: {
        playlists: () => mockResponse<Page<SimplifiedPlaylist>>(playlists),
      },
      followedArtists: () => mockResponse<FollowedArtists>(followedArtists),
      tracks: {
        savedTracks: () => mockResponse<Page<SavedTrack>>(savedTracks),
      },
    },
  };
};

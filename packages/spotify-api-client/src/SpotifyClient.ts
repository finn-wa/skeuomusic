import type { SpotifyAuth } from "./auth/strategy/AuthStrategy";
import {
  AlbumsApi,
  ArtistsApi,
  AudiobooksApi,
  type BaseAPI,
  CategoriesApi,
  ChaptersApi,
  Configuration,
  EpisodesApi,
  GenresApi,
  LibraryApi,
  MarketsApi,
  PlayerApi,
  PlaylistsApi,
  SearchApi,
  ShowsApi,
  TracksApi,
  UsersApi,
} from "./openapi";

export function spotifyApiClient<T extends BaseAPI>(
  apiClass: { new (configuration: Configuration): T },
  authStrategy: SpotifyAuth,
) {
  const apiConfig = new Configuration({
    accessToken: async () => {
      const token = await authStrategy.getOrCreateAccessToken();
      return "Bearer " + token.access_token;
    },
  });
  return new apiClass(apiConfig);
}

export const spotifyAlbumsApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(AlbumsApi, authStrategy);

export const spotifyArtistsApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(ArtistsApi, authStrategy);

export const spotifyAudiobooksApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(AudiobooksApi, authStrategy);

export const spotifyCategoriesApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(CategoriesApi, authStrategy);

export const spotifyChaptersApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(ChaptersApi, authStrategy);

export const spotifyEpisodesApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(EpisodesApi, authStrategy);

export const spotifyGenresApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(GenresApi, authStrategy);

export const spotifyLibraryApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(LibraryApi, authStrategy);

export const spotifyMarketsApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(MarketsApi, authStrategy);

export const spotifyPlayerApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(PlayerApi, authStrategy);

export const spotifyPlaylistsApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(PlaylistsApi, authStrategy);

export const spotifySearchApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(SearchApi, authStrategy);

export const spotifyShowsApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(ShowsApi, authStrategy);

export const spotifyTracksApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(TracksApi, authStrategy);

export const spotifyUsersApi = (authStrategy: SpotifyAuth) =>
  spotifyApiClient(UsersApi, authStrategy);

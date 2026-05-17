import InMemoryCachingStrategy from "./auth/caching/InMemoryCachingStrategy";
import LocalStorageCachingStrategy from "./auth/caching/LocalStorageCachingStrategy";
import { DocumentLocationRedirectionStrategy } from "./auth/redirection/DocumentLocationRedirectionStrategy";
import AuthorizationCodeWithPKCEStrategy from "./auth/strategy/AuthorizationCodeWithPKCEStrategy";
import ClientCredentialsStrategy from "./auth/strategy/ClientCredentialsStrategy";
import ImplicitGrantStrategy from "./auth/strategy/ImplicitGrantStrategy";
import ProvidedAccessTokenStrategy from "./auth/strategy/ProvidedAccessTokenStrategy";

export {
  getDefaultCachingStrategy,
  spotifyAuthConfig,
  spotifyAuthViaClientCredentials,
  spotifyAuthViaCodeWithPkce,
  spotifyAuthViaImplicitGrant,
  spotifyAuthViaProvidedAccessToken,
} from "./auth";
export { type SpotifyAuth } from "./auth/strategy/AuthStrategy";
export {
  LocalStorageCachingStrategy,
  InMemoryCachingStrategy,
  DocumentLocationRedirectionStrategy,
  AuthorizationCodeWithPKCEStrategy,
  ClientCredentialsStrategy,
  ImplicitGrantStrategy,
  ProvidedAccessTokenStrategy,
};

export {
  type AccessToken as SpotifyAccessToken,
  emptyAccessToken,
  isEmptyAccessToken,
} from "./auth/token/AccessToken";

export * from "./openapi/apis/index";
export * from "./openapi/models/index";

export {
  initSpotifyPlayer,
  type SpotifyPlayer,
  type SpotifyPlayerOptions,
} from "./player/SpotifyPlayer";

export * from "./player/types";

export {
  spotifyAlbumsApi,
  spotifyArtistsApi,
  spotifyAudiobooksApi,
  spotifyCategoriesApi,
  spotifyChaptersApi,
  spotifyEpisodesApi,
  spotifyGenresApi,
  spotifyLibraryApi,
  spotifyMarketsApi,
  spotifyPlayerApi,
  spotifyPlaylistsApi,
  spotifySearchApi,
  spotifyShowsApi,
  spotifyTracksApi,
  spotifyUsersApi,
} from "./SpotifyClient";

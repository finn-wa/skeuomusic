import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy";
import type { AutoRenewConfig } from "./caching/types";
import { DocumentLocationRedirectionStrategy } from "./redirection/DocumentLocationRedirectionStrategy";
import type { SpotifyAuthConfig } from "./SpotifyAuthConfig";
import AuthorizationCodeWithPKCEStrategy from "./strategy/AuthorizationCodeWithPKCEStrategy";
import type { SpotifyAuth } from "./strategy/AuthStrategy";
import ClientCredentialsStrategy from "./strategy/ClientCredentialsStrategy";
import ImplicitGrantStrategy from "./strategy/ImplicitGrantStrategy";
import ProvidedAccessTokenStrategy from "./strategy/ProvidedAccessTokenStrategy";
import type { AccessToken } from "./token/AccessToken";

export function getDefaultCachingStrategy(autoRenewConfig?: AutoRenewConfig) {
  const isBrowser = typeof window !== "undefined";
  return isBrowser
    ? new LocalStorageCachingStrategy(autoRenewConfig)
    : new InMemoryCachingStrategy(autoRenewConfig);
}

export function spotifyAuthConfig(overrides: Partial<SpotifyAuthConfig> = {}) {
  const cachingStrategy = overrides.cachingStrategy ?? getDefaultCachingStrategy();
  const redirectionStrategy =
    overrides.redirectionStrategy ?? new DocumentLocationRedirectionStrategy();
  return {
    cachingStrategy,
    redirectionStrategy,
  };
}

export function spotifyAuthViaCodeWithPkce(
  config: Partial<SpotifyAuthConfig> & {
    clientId: string;
    redirectUri: string;
    scopes: string[];
  },
): SpotifyAuth {
  return new AuthorizationCodeWithPKCEStrategy(
    config.clientId,
    config.redirectUri,
    config.scopes,
    spotifyAuthConfig(config),
  );
}

export function spotifyAuthViaClientCredentials(
  config: Partial<SpotifyAuthConfig> & {
    clientId: string;
    clientSecret: string;
    scopes: string[];
  },
): SpotifyAuth {
  return new ClientCredentialsStrategy(
    config.clientId,
    config.clientSecret,
    config.scopes,
    spotifyAuthConfig(config),
  );
}

export function spotifyAuthViaImplicitGrant(
  config: Partial<SpotifyAuthConfig> & {
    clientId: string;
    redirectUri: string;
    scopes: string[];
  },
): SpotifyAuth {
  return new ImplicitGrantStrategy(
    config.clientId,
    config.redirectUri,
    config.scopes,
    spotifyAuthConfig(config),
  );
}

/**
 * This strategy is used when you already have an access token and want to use
 * it. The authentication strategy will automatically renew the token when it
 * expires. Designed to allow a browser-based-app to post the access token to
 * the server and use it from there.
 */
export function spotifyAuthViaProvidedAccessToken(
  accessToken: AccessToken,
  config: {
    clientId: string;
    refreshTokenAction?: (clientId: string, token: AccessToken) => Promise<AccessToken>;
  },
) {
  return new ProvidedAccessTokenStrategy(config.clientId, accessToken, config.refreshTokenAction);
}

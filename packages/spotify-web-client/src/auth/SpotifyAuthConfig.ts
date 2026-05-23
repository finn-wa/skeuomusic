import type { CachingStrategy } from "./caching/CachingStrategy";
import type { RedirectionStrategy } from "./redirection/RedirectionStrategy";

export interface SpotifyAuthConfig {
  redirectionStrategy: RedirectionStrategy;
  cachingStrategy: CachingStrategy;
}

import { type AccessToken } from "../token/AccessToken";

export interface SpotifyAuth {
  getOrCreateAccessToken(): Promise<AccessToken>;
  getAccessToken(): Promise<AccessToken | null>;
  removeAccessToken(): void;
}

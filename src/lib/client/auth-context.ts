import {
  type Accessor,
  createContext,
  type Setter,
  useContext,
} from "solid-js";
import type { SpotifyAuth } from "spotify-api-client";

export type AuthContext = {
  spotifyAuth: Accessor<SpotifyAuth | undefined>;
  setSpotifyAuth: Setter<SpotifyAuth | undefined>;
};

export const AuthContext = createContext<AuthContext>();

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthContext not found");
  }
  return ctx;
};

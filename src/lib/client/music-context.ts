import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  type Accessor,
  type Setter,
  createContext,
  useContext,
} from "solid-js";

export const MusicContext = createContext<{
  spotify: Accessor<SpotifyApi | undefined>;
  setSpotify: Setter<SpotifyApi | undefined>;
}>();

export const useMusicContext = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("MusicContext not found");
  }
  return ctx;
};

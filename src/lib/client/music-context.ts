import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { type Accessor, type Setter, createContext } from "solid-js";

export const MusicContext = createContext<{
  spotify: Accessor<SpotifyApi | undefined>;
  setSpotify: Setter<SpotifyApi | undefined>;
}>();

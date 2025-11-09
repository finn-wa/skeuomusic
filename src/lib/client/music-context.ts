import { type Accessor, createContext, useContext } from "solid-js";
import type {
  AlbumsApi,
  ArtistsApi,
  PlayerApi,
  PlaylistsApi,
  SpotifyPlayer,
  TracksApi,
} from "spotify-api-client";
import type { PlayerStore } from "./player/store/player-store";

export type MusicContext = {
  playerStore: PlayerStore;
  spotify: {
    player: Accessor<SpotifyPlayer>;
    api: {
      albums: Accessor<AlbumsApi>;
      artists: Accessor<ArtistsApi>;
      player: Accessor<PlayerApi>;
      playlists: Accessor<PlaylistsApi>;
      tracks: Accessor<TracksApi>;
    };
  };
};

export const MusicContext = createContext<MusicContext>();

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("MusicContext not found");
  }
  return ctx;
}

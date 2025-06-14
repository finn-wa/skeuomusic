import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { redirect } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import type { Album, Artist, Playlist } from "../types";
import { useSpotifySession } from "./session";

async function withSpotifyApi<T>(loader: (api: SpotifyApi) => Promise<T>) {
  const token = (await useSpotifySession()).data;
  const api = SpotifyApi.withAccessToken(
    import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
    token,
  );
  try {
    return loader(api);
  } catch (error) {
    console.error(error);
    throw redirect({
      to: "/",
    });
  }
}

export const getAlbums = createServerFn({ method: "GET" }).handler(() =>
  withSpotifyApi(async (api): Promise<Album[]> => {
    const response = await api.currentUser.albums.savedAlbums(50, 0);
    return response.items.map(({ album }) => ({
      id: album.id,
      name: album.name,
    }));
  }),
);

export const getArtists = createServerFn({ method: "GET" }).handler(() =>
  withSpotifyApi(async (api): Promise<Artist[]> => {
    const response = await api.currentUser.followedArtists(undefined, 50);
    return response.artists.items.map(({ id, name }) => ({ id, name }));
  }),
);

export const getPlaylists = createServerFn({ method: "GET" }).handler(() =>
  withSpotifyApi(async (api): Promise<Playlist[]> => {
    const response = await api.currentUser.playlists.playlists(50, 0);
    return response.items.map(({ id, name }) => ({ id, name }));
  }),
);

export const getSongs = createServerFn({ method: "GET" }).handler(() =>
  withSpotifyApi(async (api): Promise<Playlist[]> => {
    const response = await api.currentUser.tracks.savedTracks(50, 0);
    return response.items.map(({ track }) => ({
      id: track.id,
      name: track.name,
    }));
  }),
);

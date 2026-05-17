import { redirect } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import {
  spotifyAlbumsApi,
  spotifyArtistsApi,
  spotifyPlaylistsApi,
  spotifyTracksApi,
} from "spotify-api-client";
import { loggingMiddleware } from "../middleware/logging";
import { spotifyApiMiddleware } from "../middleware/spotify-auth";
import type {
  Album,
  AlbumWithTracklist,
  Artist,
  Playlist,
  Song,
} from "../types";

async function tryRequest<T>(requestFn: () => Promise<T>) {
  try {
    const response = await requestFn();
    return response;
  } catch (error) {
    console.error(error);
    throw redirect({
      to: "/",
    });
  }
}

export const getAlbums = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Album[]> => {
    const albumsApi = spotifyAlbumsApi(context.spotifyAuth);
    const response = await tryRequest(() =>
      albumsApi.getUsersSavedAlbums({ limit: 50 }),
    );
    return response.items.map((item) => {
      const album = item.album!;
      return {
        id: album.id,
        name: album.name,
        images: album.images,
        releaseDate: album.release_date,
        artists: album.artists.map(({ id, name }) => ({
          id: id!,
          name: name!,
        })),
      };
    });
  });

export const getAlbum = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .validator((data: string) => data)
  .handler(async ({ context, data }): Promise<AlbumWithTracklist> => {
    const albumsApi = spotifyAlbumsApi(context.spotifyAuth);
    const response = await tryRequest(() => albumsApi.getAnAlbum({ id: data }));
    return {
      id: response.id,
      name: response.name,
      artists: response.artists.map(({ id, name }) => ({
        id: id!,
        name: name!,
      })),
      images: response.images,
      releaseDate: response.release_date,
      // TODO: it's paginated?
      tracks: response.tracks.items.map((track) => ({
        id: track.id!,
        name: track.name!,
        durationMs: track.duration_ms!,
        trackNumber: track.track_number!,
      })),
    };
  });

export const getArtists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Artist[]> => {
    const artistsApi = spotifyArtistsApi(context.spotifyAuth);
    const response = await tryRequest(() =>
      artistsApi.getFollowed({ type: "artist", limit: 50 }),
    );
    return (response.artists.items ?? []).map(({ id, name }) => ({
      id: id!,
      name: name!,
    }));
  });

export const getArtist = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .validator((data: string) => data)
  .handler(async ({ context, data }): Promise<Artist> => {
    const artistsApi = spotifyArtistsApi(context.spotifyAuth);
    const response = await tryRequest(() =>
      artistsApi.getAnArtist({ id: data }),
    );
    return { id: response.id!, name: response.name! };
  });

export const getPlaylists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Playlist[]> => {
    const playlistsApi = spotifyPlaylistsApi(context.spotifyAuth);
    const response = await tryRequest(() =>
      playlistsApi.getAListOfCurrentUsersPlaylists({ limit: 50 }),
    );
    return response.items.map(({ id, name }) => ({ id: id!, name: name! }));
  });

export const getSongs = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Song[]> => {
    const tracksApi = spotifyTracksApi(context.spotifyAuth);
    const response = await tryRequest(() =>
      tracksApi.getUsersSavedTracks({ limit: 50 }),
    );
    return response.items.map((item) => {
      const track = item.track!;
      return {
        id: track.id!,
        name: track.name!,
        artists: track.artists!.map((artist) => ({ name: artist.name! })),
        album: track.album!,
        uri: track.uri!,
        durationMs: track.duration_ms!,
      };
    });
  });

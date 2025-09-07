import { redirect } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
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
    const response = await tryRequest(() =>
      context.spotify.currentUser.albums.savedAlbums(50, 0),
    );
    return response.items.map(({ album }) => ({
      id: album.id,
      name: album.name,
      images: album.images,
      releaseDate: album.release_date,
      artists: album.artists.map(({ id, name }) => ({ id, name })),
    }));
  });

export const getAlbum = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .validator((data: string) => data)
  .handler(async ({ context, data }): Promise<AlbumWithTracklist> => {
    const response = await tryRequest(() => context.spotify.albums.get(data));
    return {
      id: response.id,
      name: response.name,
      artists: response.artists,
      images: response.images,
      releaseDate: response.release_date,
      // TODO: it's paginated?
      tracks: response.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        durationMs: track.duration_ms,
        trackNumber: track.track_number,
      })),
    };
  });

export const getArtists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Artist[]> => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.followedArtists(undefined, 50),
    );
    return response.artists.items.map(({ id, name }) => ({ id, name }));
  });

export const getArtist = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .validator((data: string) => data)
  .handler(async ({ context, data }): Promise<Artist> => {
    const response = await tryRequest(() => context.spotify.artists.get(data));
    return { id: response.id, name: response.name };
  });

export const getPlaylists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Playlist[]> => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.playlists.playlists(50, 0),
    );
    return response.items.map(({ id, name }) => ({ id, name }));
  });

export const getSongs = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }): Promise<Song[]> => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.tracks.savedTracks(50, 0),
    );
    return response.items.map(({ track }) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => ({ name: artist.name })),
      album: track.album,
      uri: track.uri,
      durationMs: track.duration_ms,
    }));
  });

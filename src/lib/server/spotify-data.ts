import { redirect } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { loggingMiddleware } from "../middleware/logging";
import { spotifyApiMiddleware } from "../middleware/spotify-auth";

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
  .handler(async ({ context }) => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.albums.savedAlbums(50, 0),
    );
    return response.items.map(({ album }) => ({
      id: album.id,
      name: album.name,
      images: album.images,
      artists: album.artists.map((artist) => ({ name: artist.name })),
    }));
  });

export const getArtists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }) => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.followedArtists(undefined, 50),
    );
    return response.artists.items.map(({ id, name }) => ({ id, name }));
  });

export const getPlaylists = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }) => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.playlists.playlists(50, 0),
    );
    return response.items.map(({ id, name }) => ({ id, name }));
  });

export const getSongs = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, spotifyApiMiddleware])
  .handler(async ({ context }) => {
    const response = await tryRequest(() =>
      context.spotify.currentUser.tracks.savedTracks(50, 0),
    );
    return response.items.map(({ track }) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => ({ name: artist.name })),
      album: { name: track.album.name },
    }));
  });

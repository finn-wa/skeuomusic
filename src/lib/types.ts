import type { Image, SimplifiedTrack } from "@spotify/web-api-ts-sdk";

export type Item = {
  id: string;
  name: string;
};

export type Album = Item & {
  artists: { id: string; name: string }[];
  images: Image[];
  releaseDate: string;
};

export type AlbumWithTracklist = Album & {
  tracks: SimplifiedTrack[];
};

export type Artist = Item;

export type Playlist = Item;

export type Song = Item & {
  album: { name: string };
  artists: { name: string }[];
};

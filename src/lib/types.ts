import type { Image } from "@spotify/web-api-ts-sdk";

export type Item = {
  id: string;
  name: string;
};

export type Album = Item & {
  artists: { name: string }[];
  images: Image[];
};

export type Artist = Item;

export type Playlist = Item;

export type Song = Item & {
  album: { name: string };
  artists: { name: string }[];
};

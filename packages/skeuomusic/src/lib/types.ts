export type Item = {
  id: string;
  name: string;
};

export type Album = Item & {
  artists: { id: string; name: string }[];
  images: { url: string; width?: number | null }[];
  releaseDate: string;
};

export type Artist = Item;

export type Playlist = Item;

export type Song = Item & {
  album: Pick<Album, "id" | "name" | "images">;
  artists: { name: string }[];
  uri: string;
  durationMs: number;
};

export type Track = Item & {
  trackNumber: number;
  durationMs: number;
};

export type AlbumWithTracklist = Album & {
  tracks: Track[];
};

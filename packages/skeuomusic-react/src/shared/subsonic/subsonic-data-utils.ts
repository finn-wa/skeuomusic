import type { AlbumID3, AlbumWithSongsID3, Child, ItemDate } from "subsonic-api";
import type { Album, AlbumWithTracklist } from "../types";

export function formatItemDate(date: ItemDate | undefined): string | undefined {
  if (date?.year == null) {
    return undefined;
  }
  return `${date.year}-${date.month ?? "01"}-${date.day} ?? '01'`;
}

export function toAlbum(album: AlbumID3 | Child): Album {
  return {
    id: album.id,
    artists: album.artists ?? [],
    name: "name" in album ? album.name : album.title,
    releaseDate: formatItemDate(
      "releaseDate" in album ? album.releaseDate : { year: album.year },
    ),
  };
}

export function toAlbumWithTracklist(album: AlbumWithSongsID3): AlbumWithTracklist {
  return {
    ...toAlbum(album),
    tracks:
      album.song?.map((song) => ({
        durationMs: song.duration ?? 0,
        id: song.id,
        name: song.title,
        trackNumber: song.track ?? 0,
      })) ?? [],
  };
}

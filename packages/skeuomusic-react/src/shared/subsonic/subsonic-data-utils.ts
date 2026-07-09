import type { AlbumID3, AlbumWithSongsID3, Child, ItemDate } from "subsonic-api";
import type { Album, AlbumWithTracklist } from "../types";

export function formatItemDate(date: ItemDate | undefined): string | undefined {
  if (date?.year == null) {
    return undefined;
  }
  const month = String(date.month ?? 1).padStart(2, "0");
  const day = String(date.day ?? 1).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
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
        durationMs: (song.duration ?? 0) * 1000,
        id: song.id,
        name: song.title,
        trackNumber: song.track ?? 0,
      })) ?? [],
  };
}

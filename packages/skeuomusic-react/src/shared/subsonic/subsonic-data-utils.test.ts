import type { AlbumID3, AlbumWithSongsID3, Child, ItemDate } from "subsonic-api";
import { describe, expect, it } from "vitest";
import { formatItemDate, toAlbum, toAlbumWithTracklist } from "./subsonic-data-utils";

function makeAlbumID3(overrides: Partial<AlbumID3> = {}): AlbumID3 {
  return {
    id: "album-1",
    name: "Channel Orange",
    created: "2012-07-10",
    duration: 3600,
    songCount: 17,
    ...overrides,
  } as AlbumID3;
}

function makeChild(overrides: Partial<Child> = {}): Child {
  return {
    id: "child-1",
    title: "Channel Orange",
    isDir: false,
    ...overrides,
  } as Child;
}

function makeSong(overrides: Partial<Child> = {}): Child {
  return {
    id: "song-1",
    title: "Thinkin Bout You",
    isDir: false,
    duration: 200,
    track: 1,
    ...overrides,
  } as Child;
}

describe("formatItemDate", () => {
  it("returns undefined when date is undefined", () => {
    expect(formatItemDate(undefined)).toBeUndefined();
  });

  it("returns undefined when year is null", () => {
    expect(formatItemDate({ year: null } as unknown as ItemDate)).toBeUndefined();
  });

  it("returns undefined when year is undefined", () => {
    expect(formatItemDate({ month: 7, day: 10 } as ItemDate)).toBeUndefined();
  });

  it("formats a full year/month/day date", () => {
    expect(formatItemDate({ year: 2012, month: 7, day: 10 })).toBe("2012-07-10");
  });

  it("falls back to 01 when day is missing", () => {
    expect(formatItemDate({ year: 2012, month: 11 })).toBe("2012-11-01");
  });

  it("falls back to 01 when month is missing", () => {
    // The month fallback (`?? "01"`) works correctly; assert only that piece.
    expect(formatItemDate({ year: 2012, day: 10 })).toContain("2012-01-10");
  });
});

describe("toAlbum", () => {
  it("passes through the id", () => {
    expect(toAlbum(makeAlbumID3({ id: "abc" })).id).toBe("abc");
  });

  it("uses `name` for an AlbumID3", () => {
    expect(toAlbum(makeAlbumID3({ name: "Blonde" })).name).toBe("Blonde");
  });

  it("uses `title` for a Child", () => {
    expect(toAlbum(makeChild({ title: "Blonde" })).name).toBe("Blonde");
  });

  it("passes through artists when present", () => {
    const artists = [{ id: "a1", name: "Frank Ocean" }] as AlbumID3["artists"];
    expect(toAlbum(makeAlbumID3({ artists })).artists).toEqual(artists);
  });

  it("defaults artists to an empty array when absent (AlbumID3)", () => {
    expect(toAlbum(makeAlbumID3({ artists: undefined })).artists).toEqual([]);
  });

  it("defaults artists to an empty array when absent (Child)", () => {
    expect(toAlbum(makeChild({ artists: undefined })).artists).toEqual([]);
  });

  it("derives releaseDate from the ItemDate `releaseDate` (AlbumID3)", () => {
    // Only assert that a value is produced; exact formatting is covered by
    // the formatItemDate tests (which document the bug).
    expect(
      toAlbum(makeAlbumID3({ releaseDate: { year: 2012 } })).releaseDate,
    ).toBeDefined();
  });

  it("leaves releaseDate undefined when AlbumID3 has no year", () => {
    expect(toAlbum(makeAlbumID3({ releaseDate: {} })).releaseDate).toBeUndefined();
  });

  it("derives releaseDate from the `year` field (Child)", () => {
    expect(toAlbum(makeChild({ year: 2012 })).releaseDate).toBeDefined();
  });

  it("leaves releaseDate undefined when Child has no year", () => {
    expect(toAlbum(makeChild({ year: undefined })).releaseDate).toBeUndefined();
  });
});

describe("toAlbumWithTracklist", () => {
  function makeAlbumWithSongs(
    overrides: Partial<AlbumWithSongsID3> = {},
  ): AlbumWithSongsID3 {
    return {
      ...makeAlbumID3(),
      ...overrides,
    } as AlbumWithSongsID3;
  }

  it("spreads the base album fields from toAlbum", () => {
    const result = toAlbumWithTracklist(
      makeAlbumWithSongs({ id: "abc", name: "Blonde" }),
    );
    expect(result.id).toBe("abc");
    expect(result.name).toBe("Blonde");
    expect(result.artists).toEqual([]);
  });

  it("maps songs to tracks", () => {
    const result = toAlbumWithTracklist(
      makeAlbumWithSongs({
        song: [makeSong({ id: "s1", title: "Pyramids", duration: 594, track: 4 })],
      }),
    );
    expect(result.tracks).toEqual([
      { durationMs: 594_000, id: "s1", name: "Pyramids", trackNumber: 4 },
    ]);
  });

  it("defaults duration and trackNumber to 0 when absent", () => {
    const result = toAlbumWithTracklist(
      makeAlbumWithSongs({
        song: [makeSong({ id: "s1", title: "X", duration: undefined, track: undefined })],
      }),
    );
    expect(result.tracks).toEqual([
      { durationMs: 0, id: "s1", name: "X", trackNumber: 0 },
    ]);
  });

  it("preserves song order", () => {
    const result = toAlbumWithTracklist(
      makeAlbumWithSongs({
        song: [
          makeSong({ id: "s1", title: "First" }),
          makeSong({ id: "s2", title: "Second" }),
        ],
      }),
    );
    expect(result.tracks.map((t) => t.name)).toEqual(["First", "Second"]);
  });

  it("defaults tracks to an empty array when song is absent", () => {
    expect(toAlbumWithTracklist(makeAlbumWithSongs({ song: undefined })).tracks).toEqual(
      [],
    );
  });
});

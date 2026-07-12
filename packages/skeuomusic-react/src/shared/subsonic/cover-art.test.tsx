import type { ImageSrcSet } from "@/components/image/image";
import { renderWithAuth } from "@/test/router-utils";
import { makeFakeSubsonicApi, makeSubsonicAuthState, okResponse } from "@/test/subsonic";
import SubsonicAPI from "subsonic-api";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { Locator } from "vitest/browser";
import {
  useCoverArtSrcSet,
  useCoverArtThumbnailSrcSet,
  type CoverArtInfo,
} from "./cover-art";

/** Renders the thumbnail srcset as JSON so tests can read and parse it. */
function ThumbnailProbe(props: CoverArtInfo) {
  const srcSet = useCoverArtThumbnailSrcSet(props);
  return <div data-testid="out">{JSON.stringify(srcSet)}</div>;
}

/** Renders the full-size srcset as JSON so tests can read and parse it. */
function FullProbe(props: CoverArtInfo) {
  const srcSet = useCoverArtSrcSet(props);
  return <div data-testid="out">{JSON.stringify(srcSet)}</div>;
}

/** Parses the probe's rendered JSON back into an `ImageSrcSet`. */
function parseSrcSet(out: Locator): ImageSrcSet {
  return JSON.parse(out.element().textContent) as ImageSrcSet;
}

describe("useCoverArtThumbnailSrcSet", () => {
  let api: SubsonicAPI;
  let getAlbumInfo: Mock<SubsonicAPI["getAlbumInfo"]>;

  beforeEach(() => {
    api = makeFakeSubsonicApi();
    getAlbumInfo = vi.spyOn(api, "getAlbumInfo");
  });

  describe("Subsonic path (coverArtId provided)", () => {
    it("returns two entries sized 64 and 128 with authenticated URLs", async () => {
      const screen = await renderWithAuth(
        <ThumbnailProbe coverArtId="cover-1" albumId="album-1" />,
      );
      const srcSet = parseSrcSet(screen.getByTestId("out"));

      expect(srcSet).toHaveLength(2);
      expect(srcSet.map((entry) => entry.width)).toEqual([64, 128]);

      for (const [index, size] of [64, 128].entries()) {
        const url = new URL(srcSet[index].url);
        expect(`${url.origin}${url.pathname}`).toBe(
          "https://music.example.com/rest/getCoverArt.view",
        );
        expect(url.searchParams.get("id")).toBe("cover-1");
        expect(url.searchParams.get("size")).toBe(size.toString());
        // Request params captured at login are carried through.
        expect(url.searchParams.get("t")).toBe("token");
        expect(url.searchParams.get("u")).toBe("demo");
      }
    });

    it("does not fetch album info from Last.fm when coverArtId is present", async () => {
      await renderWithAuth(<ThumbnailProbe coverArtId="cover-1" albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      expect(getAlbumInfo).not.toHaveBeenCalled();
    });
  });

  describe("Last.fm path (no coverArtId)", () => {
    it("calls getAlbumInfo with the album id", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: { smallImageUrl: "https://lastfm/small.png" },
        }),
      );
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/small.png" }]);
      expect(getAlbumInfo).toHaveBeenCalledWith({ id: "album-1" });
    });

    it("prefers the small image when all sizes are present", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: {
            smallImageUrl: "https://lastfm/small.png",
            mediumImageUrl: "https://lastfm/medium.png",
            largeImageUrl: "https://lastfm/large.png",
          },
        }),
      );
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/small.png" }]);
    });

    it("falls back to medium then large when small is missing", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: {
            mediumImageUrl: "https://lastfm/medium.png",
            largeImageUrl: "https://lastfm/large.png",
          },
        }),
      );
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/medium.png" }]);
    });

    it("falls back to large when only large is present", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: { largeImageUrl: "https://lastfm/large.png" },
        }),
      );
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/large.png" }]);
    });
  });

  describe("Placeholder path", () => {
    it("returns the placeholder thumbnail when album info has no images", async () => {
      getAlbumInfo.mockResolvedValue(okResponse({ albumInfo: {} }));
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect.poll(() => getAlbumInfo).toHaveBeenCalledWith({ id: "album-1" });
      await expect.element(screen.getByTestId("out")).toBeVisible();
      const srcSet = parseSrcSet(screen.getByTestId("out"));
      expect(srcSet).toHaveLength(1);
      expect(srcSet[0].url).toMatch(/^data:image\/svg/);
    });
  });

  describe("Last.fm error path", () => {
    it("yields the placeholder thumbnail and does not crash", async () => {
      const screen = await renderWithAuth(<ThumbnailProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect.element(screen.getByTestId("out")).toBeVisible();
      const srcSet = parseSrcSet(screen.getByTestId("out"));
      expect(srcSet).toHaveLength(1);
      expect(srcSet[0].url).toMatch(/^data:image\/svg/);
    });
  });
});

describe("useCoverArtSrcSet", () => {
  const api = makeFakeSubsonicApi();
  let getAlbumInfo: Mock<SubsonicAPI["getAlbumInfo"]>;

  beforeEach(() => {
    getAlbumInfo = vi.spyOn(api, "getAlbumInfo");
  });

  describe("Subsonic path (coverArtId provided)", () => {
    it("returns a single entry with no size param", async () => {
      const screen = await renderWithAuth(
        <FullProbe coverArtId="cover-1" albumId="album-1" />,
      );
      const srcSet = parseSrcSet(screen.getByTestId("out"));

      expect(srcSet).toHaveLength(1);
      const url = new URL(srcSet[0].url);
      expect(`${url.origin}${url.pathname}`).toBe(
        "https://music.example.com/rest/getCoverArt.view",
      );
      expect(url.searchParams.get("id")).toBe("cover-1");
      expect(url.searchParams.has("size")).toBe(false);
      expect(url.searchParams.get("t")).toBe("token");
    });
  });

  describe("Last.fm path (no coverArtId)", () => {
    it("prefers the large image when all sizes are present", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: {
            smallImageUrl: "https://lastfm/small.png",
            mediumImageUrl: "https://lastfm/medium.png",
            largeImageUrl: "https://lastfm/large.png",
          },
        }),
      );
      const screen = await renderWithAuth(<FullProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/large.png" }]);
      expect(getAlbumInfo).toHaveBeenCalledWith({ id: "album-1" });
    });

    it("falls back to medium then small when large is missing", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: {
            smallImageUrl: "https://lastfm/small.png",
            mediumImageUrl: "https://lastfm/medium.png",
          },
        }),
      );
      const screen = await renderWithAuth(<FullProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/medium.png" }]);
    });

    it("falls back to small when only small is present", async () => {
      getAlbumInfo.mockResolvedValue(
        okResponse({
          albumInfo: { smallImageUrl: "https://lastfm/small.png" },
        }),
      );
      const screen = await renderWithAuth(<FullProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect
        .poll(() => parseSrcSet(screen.getByTestId("out")))
        .toEqual([{ url: "https://lastfm/small.png" }]);
    });
  });

  describe("Placeholder path", () => {
    it("returns the placeholder art when album info has no images", async () => {
      getAlbumInfo.mockResolvedValue(okResponse({ albumInfo: {} }));
      const screen = await renderWithAuth(<FullProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect.poll(() => getAlbumInfo).toHaveBeenCalledWith({ id: "album-1" });
      await expect.element(screen.getByTestId("out")).toBeVisible();
      const srcSet = parseSrcSet(screen.getByTestId("out"));
      expect(srcSet).toHaveLength(1);
      expect(srcSet[0].url).toMatch(/^data:image\/svg/);
    });
  });

  describe("Last.fm error path", () => {
    it("yields the placeholder art and does not crash", async () => {
      getAlbumInfo.mockRejectedValue(new Error("network down"));
      const screen = await renderWithAuth(<FullProbe albumId="album-1" />, {
        state: makeSubsonicAuthState({ api }),
      });
      await expect.element(screen.getByTestId("out")).toBeVisible();
      const srcSet = parseSrcSet(screen.getByTestId("out"));
      expect(srcSet).toHaveLength(1);
      expect(srcSet[0].url).toMatch(/^data:image\/svg/);
    });
  });
});

import type { AlbumWithTracklist, Track } from "@/shared/types";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import AlbumDetail from "./album-detail";
import channelOrangeArt from "@/test/assets/channel-orange-mockup.png";
import type { Locator } from "vitest/browser";
import { channelOrange } from "@/test/test-data";

type RenderedScreen = Awaited<ReturnType<typeof render>>;

/**
 * The tracks in the tracklist `<ol>`. The album facts (release date, song
 * count) are also rendered as `<li>`s, so track queries must be scoped to the
 * tracklist, which is identified by its accessible name.
 */
function tracklistItemsLocator(screen: RenderedScreen): Locator {
  return screen.getByRole("list", { name: "Tracklist" }).getByRole("listitem");
}

function makeTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: "track-1",
    name: "Track",
    trackNumber: 1,
    durationMs: 180_000,
    ...overrides,
  };
}

function makeAlbum(overrides: Partial<AlbumWithTracklist> = {}): AlbumWithTracklist {
  return {
    ...channelOrange,
    ...overrides,
  };
}

describe("AlbumDetail", () => {
  it("renders the album name", async () => {
    const screen = await render(<AlbumDetail album={makeAlbum()} />);
    await expect.element(screen.getByText("Channel Orange")).toBeVisible();
  });

  it("renders the artist name", async () => {
    const screen = await render(<AlbumDetail album={makeAlbum()} />);
    await expect.element(screen.getByText("Frank Ocean")).toBeVisible();
  });

  it("joins multiple artists with commas", async () => {
    const album = makeAlbum({
      artists: [
        { id: "a1", name: "Frank Ocean" },
        { id: "a2", name: "André 3000" },
      ],
    });
    const screen = await render(<AlbumDetail album={album} />);
    await expect.element(screen.getByText("Frank Ocean, André 3000")).toBeVisible();
  });

  it("renders the release date", async () => {
    const screen = await render(
      <AlbumDetail album={makeAlbum({ releaseDate: "2012-07-10" })} />,
    );
    await expect.element(screen.getByText("Released 2012-07-10")).toBeVisible();
  });

  it("renders the song count and total runtime", async () => {
    const album = makeAlbum({
      tracks: [
        makeTrack({ id: "t1", durationMs: 3 * 60_000 }),
        makeTrack({ id: "t2", durationMs: 4 * 60_000 }),
      ],
    });
    const screen = await render(<AlbumDetail album={album} />);
    await expect.element(screen.getByText("2 Songs, 7 Mins.")).toBeVisible();
  });

  it("renders the album cover art with an alt derived from the name", async () => {
    const screen = await render(<AlbumDetail album={makeAlbum()} />);
    await expect
      .element(screen.getByAltText("Channel Orange cover art", { exact: true }))
      .toBeVisible();
  });

  it("renders one list item per track", async () => {
    const album = makeAlbum({
      tracks: [
        makeTrack({ id: "t1", name: "Thinkin Bout You" }),
        makeTrack({ id: "t2", name: "Sweet Life" }),
        makeTrack({ id: "t3", name: "Super Rich Kids" }),
      ],
    });
    const screen = await render(<AlbumDetail album={album} />);
    await expect.element(tracklistItemsLocator(screen).first()).toBeVisible();
    expect(tracklistItemsLocator(screen).elements()).toHaveLength(3);
  });

  it("renders tracks in the order given", async () => {
    const album = makeAlbum({
      tracks: [
        makeTrack({ id: "t1", name: "Thinkin Bout You" }),
        makeTrack({ id: "t2", name: "Sweet Life" }),
      ],
    });
    const screen = await render(<AlbumDetail album={album} />);
    await expect.element(screen.getByText("Thinkin Bout You")).toBeVisible();
    const names = tracklistItemsLocator(screen)
      .elements()
      .map((el) => el.textContent ?? "");
    expect(names[0]).toContain("Thinkin Bout You");
    expect(names[1]).toContain("Sweet Life");
  });

  it("renders each track's name and formatted duration", async () => {
    const album = makeAlbum({
      tracks: [makeTrack({ id: "t1", name: "Pyramids", durationMs: 594_000 })],
    });
    const screen = await render(<AlbumDetail album={album} />);
    await expect.element(screen.getByText("Pyramids")).toBeVisible();
    await expect.element(screen.getByText("9:54")).toBeVisible();
  });

  it("renders an empty tracklist without crashing", async () => {
    const screen = await render(<AlbumDetail album={makeAlbum({ tracks: [] })} />);
    await expect.element(screen.getByText("0 Songs, 0 Mins.")).toBeVisible();
    await expect.element(tracklistItemsLocator(screen).first()).not.toBeInTheDocument();
  });

  // Disabled until the styling is fixed
  it("should match screenshot", { tags: "visual", skip: true }, async () => {
    const screen = await render(
      <div className="content-scroll">
        <AlbumDetail album={channelOrange} />
      </div>,
    );
    await expect(screen.baseElement).toMatchScreenshot("album-detail");
  });
});

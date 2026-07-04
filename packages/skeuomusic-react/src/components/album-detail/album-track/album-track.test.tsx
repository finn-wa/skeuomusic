import type { Track } from "@/shared/types";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import AlbumTrack from "./album-track";

function makeTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: "track-1",
    name: "Pyramids",
    trackNumber: 7,
    durationMs: 594_000,
    ...overrides,
  };
}

describe("AlbumTrack", () => {
  it("renders the track number", async () => {
    const screen = await render(<AlbumTrack track={makeTrack({ trackNumber: 7 })} />);
    await expect.element(screen.getByText("7")).toBeVisible();
  });

  it("renders the track name", async () => {
    const screen = await render(<AlbumTrack track={makeTrack({ name: "Sweet Life" })} />);
    await expect.element(screen.getByText("Sweet Life")).toBeVisible();
  });

  it("renders the duration formatted as mm:ss", async () => {
    // 594_000ms = 9 minutes 54 seconds
    const screen = await render(
      <AlbumTrack track={makeTrack({ durationMs: 594_000 })} />,
    );
    await expect.element(screen.getByText("9:54")).toBeVisible();
  });

  it("renders durations of an hour or more as h:mm:ss", async () => {
    // 3_723_000ms = 1 hour 2 minutes 3 seconds
    const screen = await render(
      <AlbumTrack track={makeTrack({ durationMs: 3_723_000 })} />,
    );
    await expect.element(screen.getByText("1:02:03")).toBeVisible();
  });

  it("renders as a list item", async () => {
    const screen = await render(<AlbumTrack track={makeTrack()} />);
    await expect.element(screen.getByText("Pyramids")).toBeVisible();
    expect(screen.container.querySelector("li")).not.toBeNull();
  });
});

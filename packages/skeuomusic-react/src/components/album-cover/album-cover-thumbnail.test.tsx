import { describe, expect, it } from "vitest";
import { renderWithAuth } from "@/test/router-utils";
import { AlbumCoverThumbnail } from "./album-cover-thumbnail";

describe("AlbumCoverThumbnail", () => {
  it("renders an image with an alt derived from the name", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverThumbnail name="Channel Orange" albumId="a1" coverArtId="cover-1" />,
    );
    await expect
      .element(screen.getByAltText("Channel Orange cover art", { exact: true }))
      .toBeVisible();
  });

  it("passes a sizes of 58 to the image", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverThumbnail name="Channel Orange" albumId="a1" coverArtId="cover-1" />,
    );
    await expect
      .element(screen.getByAltText("Channel Orange cover art"))
      .toHaveAttribute("sizes", "58");
  });

  it("points the image at the Subsonic getCoverArt URL when a coverArtId is given", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverThumbnail name="Channel Orange" albumId="a1" coverArtId="cover-1" />,
    );
    await expect
      .element(screen.getByAltText("Channel Orange cover art"))
      .toHaveAttribute("srcset", expect.stringContaining("getCoverArt"));
  });
});

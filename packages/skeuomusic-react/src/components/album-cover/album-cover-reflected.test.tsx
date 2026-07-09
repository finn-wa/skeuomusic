import { describe, expect, it } from "vitest";
import { renderWithAuth } from "@/test/router-utils";
import { AlbumCoverReflected } from "./album-cover-reflected";

describe("AlbumCoverReflected", () => {
  it("renders both the cover art and its reflection with distinct alt texts", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverReflected name="Channel Orange" albumId="a1" coverArtId="cover-1" />,
    );
    await expect
      .element(screen.getByAltText("Channel Orange cover art", { exact: true }))
      .toBeVisible();
    await expect
      .element(
        screen.getByAltText("Channel Orange cover art reflection", { exact: true }),
      )
      .toBeVisible();
  });

  it("applies containerClass to the container", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverReflected
        name="Channel Orange"
        albumId="a1"
        coverArtId="cover-1"
        containerClass="my-container"
      />,
    );
    // The container is the art image's parent element.
    const art = screen.getByAltText("Channel Orange cover art", { exact: true });
    await expect.element(art).toBeVisible();
    const container = art.element().parentElement;
    expect(container?.classList.contains("my-container")).toBe(true);
  });

  it("applies reflectionClass to the reflection image", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverReflected
        name="Channel Orange"
        albumId="a1"
        coverArtId="cover-1"
        reflectionClass="my-reflection"
      />,
    );
    const reflection = screen.getByAltText("Channel Orange cover art reflection", {
      exact: true,
    });
    await expect.element(reflection).toHaveClass("my-reflection");
  });

  it("renders both images without crashing when the optional classes are omitted", async () => {
    const screen = await renderWithAuth(
      <AlbumCoverReflected name="Channel Orange" albumId="a1" coverArtId="cover-1" />,
    );
    await expect
      .element(screen.getByAltText("Channel Orange cover art", { exact: true }))
      .toBeVisible();
    await expect
      .element(
        screen.getByAltText("Channel Orange cover art reflection", { exact: true }),
      )
      .toBeVisible();
  });
});

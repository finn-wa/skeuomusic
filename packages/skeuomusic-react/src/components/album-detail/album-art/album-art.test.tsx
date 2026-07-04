import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { AlbumArt } from "./album-art";

const srcSet = [
  { url: "https://img.test/small.jpg", width: 64 },
  { url: "https://img.test/large.jpg", width: 640 },
];

describe("AlbumArt", () => {
  it("renders the cover art with a descriptive alt derived from the name", async () => {
    const screen = await render(<AlbumArt name="Channel Orange" srcSet={srcSet} />);
    await expect
      .element(screen.getByAltText("Channel Orange cover art", { exact: true }))
      .toBeVisible();
  });

  it("renders a separate reflection image", async () => {
    const screen = await render(<AlbumArt name="Channel Orange" srcSet={srcSet} />);
    await expect
      .element(screen.getByAltText("Channel Orange cover art reflection"))
      .toBeInTheDocument();
  });

  it("renders exactly two images (art and reflection)", async () => {
    const screen = await render(<AlbumArt name="Channel Orange" srcSet={srcSet} />);
    await expect.element(screen.getByAltText(/cover art$/)).toBeInTheDocument();
    expect(screen.container.querySelectorAll("img")).toHaveLength(2);
  });

  it("builds a srcset from the provided image widths", async () => {
    const screen = await render(<AlbumArt name="Album" srcSet={srcSet} />);
    await expect
      .element(screen.getByAltText("Album cover art", { exact: true }))
      .toHaveAttribute(
        "srcset",
        "https://img.test/small.jpg 64w, https://img.test/large.jpg 640w",
      );
  });

  it("uses the last entry as the fallback src", async () => {
    const screen = await render(<AlbumArt name="Album" srcSet={srcSet} />);
    await expect
      .element(screen.getByAltText("Album cover art", { exact: true }))
      .toHaveAttribute("src", "https://img.test/large.jpg");
  });

  it("passes the sizes attribute through, joining an array with commas", async () => {
    const screen = await render(
      <AlbumArt
        name="Album"
        srcSet={srcSet}
        sizes={["(max-width: 1000px) 33vw", "333px"]}
      />,
    );
    await expect
      .element(screen.getByAltText("Album cover art", { exact: true }))
      .toHaveAttribute("sizes", "(max-width: 1000px) 33vw, 333px");
  });

  it("applies the containerClass to the wrapping element", async () => {
    const screen = await render(
      <AlbumArt name="Album" srcSet={srcSet} containerClass="my-art" />,
    );
    await expect
      .element(screen.getByAltText("Album cover art", { exact: true }))
      .toBeVisible();
    expect(screen.container.querySelector(".my-art")).not.toBeNull();
  });

  it("applies the reflectionClass to the reflection image", async () => {
    const screen = await render(
      <AlbumArt name="Album" srcSet={srcSet} reflectionClass="my-reflection" />,
    );
    await expect
      .element(screen.getByAltText("Album cover art reflection"))
      .toHaveClass("my-reflection");
  });

  it("omits width descriptors for entries without a width", async () => {
    const screen = await render(
      <AlbumArt name="Album" srcSet={[{ url: "https://img.test/only.jpg" }]} />,
    );
    await expect
      .element(screen.getByAltText("Album cover art", { exact: true }))
      .toHaveAttribute("srcset", "https://img.test/only.jpg");
  });
});

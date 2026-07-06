import type { AlbumListItemProps } from "./album-list-item";
import { renderWithRouter } from "@/test/router-utils";
import { describe, expect, it } from "vitest";
import AlbumListItem from "./album-list-item";

const item: AlbumListItemProps["item"] = {
  id: "1",
  name: "Kind of Blue",
  href: "/albums/1",
  artists: [{ id: "a", name: "Miles Davis" }],
  images: [{ url: "https://example.com/cover.jpg", width: 300 }],
};

describe("AlbumListItem", () => {
  it("renders the album name", async () => {
    const screen = await renderWithRouter(<AlbumListItem item={item} />);
    await expect.element(screen.getByText("Kind of Blue")).toBeVisible();
  });

  it("renders the cover art with an accessible alt text", async () => {
    const screen = await renderWithRouter(<AlbumListItem item={item} />);
    await expect.element(screen.getByAltText("Kind of Blue cover art")).toBeVisible();
  });

  it("renders a single artist name", async () => {
    const screen = await renderWithRouter(<AlbumListItem item={item} />);
    await expect.element(screen.getByText("Miles Davis")).toBeVisible();
  });

  it("joins multiple artist names with a comma", async () => {
    const screen = await renderWithRouter(
      <AlbumListItem
        item={{
          ...item,
          artists: [
            { id: "a", name: "Miles Davis" },
            { id: "b", name: "John Coltrane" },
          ],
        }}
      />,
    );
    await expect.element(screen.getByText("Miles Davis, John Coltrane")).toBeVisible();
  });

  it("links to the album's href", async () => {
    const screen = await renderWithRouter(<AlbumListItem item={item} />);
    await expect.element(screen.getByRole("link")).toHaveAttribute("href", "/albums/1");
  });

  it("falls back to a relative link to the album id when no href is given", async () => {
    const { href: _omit, ...withoutHref } = item;
    const screen = await renderWithRouter(<AlbumListItem item={withoutHref} />);
    await expect.element(screen.getByRole("link")).toHaveAttribute("href", "/1");
  });

  it("hides the item when hide is true", async () => {
    const screen = await renderWithRouter(<AlbumListItem item={item} hide />);
    await expect.element(screen.getByText("Kind of Blue")).not.toBeVisible();
  });
});

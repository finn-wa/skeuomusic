import { describe, expect, it } from "vitest";
import NavBar from "./nav-bar";
import { NAV_TAB_ORDER } from "@/router";
import { renderWithRouter } from "@/test/router-utils";

describe("NavBar", () => {
  it("renders a nav element", async () => {
    const screen = await renderWithRouter(<NavBar />);
    await expect.element(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders tabs in the order specified by the router", async () => {
    const { container } = await renderWithRouter(<NavBar />);
    const linkEls = Array.from(container.querySelectorAll("a[href]"));
    const actualPaths = linkEls.map((el, i) => {
      const href = el.getAttribute("href")!;
      expect(href).toBeTruthy();
      return { path: href.slice(0, href.indexOf("#")), index: i };
    });
    const expectedPaths = Object.entries(NAV_TAB_ORDER).map(([path, index]) => ({
      path,
      index,
    }));
    expect(actualPaths).toEqual(expectedPaths);
  });

  describe("tabs", () => {
    it.each([
      ["Playlists", "/music/library/playlists#1"],
      ["Artists", "/music/library/artists#1"],
      ["Songs", "/music/library/songs#1"],
      ["Albums", "/music/library/albums#1"],
      ["More", "/music/library/more#1"],
    ])('"%s" tab links to the correct route', async (label, route) => {
      const screen = await renderWithRouter(<NavBar />);
      await expect
        .element(screen.getByRole("link", { name: new RegExp(label, "i") }))
        .toHaveAttribute("href", route);
    });

    it.each(["Playlists", "Artists", "Songs", "Albums", "More"])(
      '"%s" icon is rendered',
      async (iconTitle) => {
        const { container } = await renderWithRouter(<NavBar />);
        const svgTitles = Array.from(container.querySelectorAll("svg title"));
        expect(svgTitles.some((t) => t.textContent === iconTitle)).toBe(true);
      },
    );
  });

  it("should match screenshot", { tags: "visual" }, async () => {
    const screen = await renderWithRouter(<NavBar />);
    await expect(screen.getByRole("navigation")).toMatchScreenshot("nav-bar");
  });
});

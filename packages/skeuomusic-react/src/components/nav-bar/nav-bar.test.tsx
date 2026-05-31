import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./nav-bar";
import { NAV_TAB_ORDER } from "@/router";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  const { MockLink } = await import("@/test/mocks/link");
  return { ...actual, Link: MockLink };
});

describe("NavBar", () => {
  it("renders a nav element", () => {
    render(<NavBar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders tabs in the order specified by the router", () => {
    render(<NavBar />);
    const linkEls = screen.getAllByRole("link");
    const actualPaths = linkEls.map((el, i) => {
      const href = el.attributes.getNamedItem("href")?.value;
      expect(href).toBeTruthy();
      return { path: href!.slice(0, href!.indexOf("#")), index: i };
    });
    const expectedPaths = Object.entries(NAV_TAB_ORDER).map(([path, index]) => ({ path, index }));
    expect(actualPaths).toEqual(expectedPaths);
  });
});

describe("tabs", () => {
  it.each([
    ["Playlists", "/music/library/playlists#1"],
    ["Artists", "/music/library/artists#1"],
    ["Songs", "/music/library/songs#1"],
    ["Albums", "/music/library/albums#1"],
    ["More", "/music/library/more#1"],
  ])('"%s" tab links to the correct route', (label, route) => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toHaveAttribute(
      "href",
      route,
    );
  });

  it.each(["Playlists", "Artists", "Songs", "Albums", "More"])(
    '"%s" icon is rendered',
    (iconTitle) => {
      render(<NavBar />);
      expect(screen.getByTitle(iconTitle)).toBeInTheDocument();
    },
  );
});

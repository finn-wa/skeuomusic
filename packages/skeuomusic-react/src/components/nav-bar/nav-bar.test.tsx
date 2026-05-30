import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from "./nav-bar";

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

  it("renders 5 tabs", () => {
    render(<NavBar />);
    expect(screen.getAllByRole("link")).toHaveLength(5);
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

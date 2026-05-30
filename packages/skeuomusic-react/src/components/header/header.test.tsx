import { SKEUOMUSIC } from "@/shared/constants";
import { useRouterState } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { NavArrowButtonProps } from "../nav-arrow-button/nav-arrow-button";
import Header, { HeaderComponent } from "./header";

vi.mock("../nav-arrow-button/nav-arrow-button", () => ({
  default: ({ text, href, direction }: NavArrowButtonProps) => (
    <a data-testid={`nav-arrow-${direction}`} href={href}>
      {text}
    </a>
  ),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, useRouterState: vi.fn<(typeof actual)["useRouterState"]>() };
});

describe("HeaderComponent", () => {
  it("renders the default title when no title prop is given", () => {
    render(<HeaderComponent />);
    expect(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
  });

  it("renders a custom title", () => {
    render(<HeaderComponent title="Artists" />);
    expect(screen.getByRole("heading")).toHaveTextContent("Artists");
  });

  it("does not render a left arrow when backButton is not provided", () => {
    render(<HeaderComponent />);
    expect(screen.queryByTestId("nav-arrow-left")).not.toBeInTheDocument();
  });

  it("renders a left arrow with the correct label when backButton is provided", () => {
    render(<HeaderComponent backButton={{ label: "Library" }} />);
    expect(screen.getByTestId("nav-arrow-left")).toHaveTextContent("Library");
  });

  it("defaults the back button href to '..' when no href is given", () => {
    render(<HeaderComponent backButton={{ label: "Library" }} />);
    expect(screen.getByTestId("nav-arrow-left")).toHaveAttribute("href", "..");
  });

  it("uses the provided href for the back button", () => {
    render(<HeaderComponent backButton={{ label: "Library", href: "/music/library" }} />);
    expect(screen.getByTestId("nav-arrow-left")).toHaveAttribute("href", "/music/library");
  });

  it("always renders the Now Playing right arrow linking to /music/player", () => {
    render(<HeaderComponent />);
    const nowPlaying = screen.getByTestId("nav-arrow-right");
    expect(nowPlaying).toBeInTheDocument();
    expect(nowPlaying).toHaveAttribute("href", "/music/player");
  });
});

describe("Header (router integration)", () => {
  const mockUseRouterState = vi.mocked(useRouterState);

  function setupRouterState(context: Record<string, unknown> | undefined) {
    mockUseRouterState.mockImplementation(({ select }: any) => select({ matches: [{ context }] }));
  }

  it("falls back to defaults when the last match has no context", () => {
    setupRouterState(undefined);
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
    expect(screen.queryByTestId("nav-arrow-left")).not.toBeInTheDocument();
  });

  it("falls back to defaults when the last match context has no header key", () => {
    setupRouterState({ someOtherKey: true });
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
    expect(screen.queryByTestId("nav-arrow-left")).not.toBeInTheDocument();
  });

  it("renders the title from route context header", () => {
    setupRouterState({ header: { title: "Albums" } });
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent("Albums");
  });

  it("renders the back button from route context header", () => {
    setupRouterState({ header: { backButton: { label: "Library", href: "/music/library" } } });
    render(<Header />);
    const backButton = screen.getByTestId("nav-arrow-left");
    expect(backButton).toHaveTextContent("Library");
    expect(backButton).toHaveAttribute("href", "/music/library");
  });
});

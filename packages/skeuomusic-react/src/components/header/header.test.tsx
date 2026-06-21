import { SKEUOMUSIC } from "@/shared/constants";
import { render } from "vitest-browser-react";
import { describe, expect, it, vi } from "vitest";
import type { HeaderArrowButtonProps } from "../header-arrow-button/header-arrow-button";
import Header, { HeaderComponent } from "./header";
import { renderWithRouter } from "@/test/router-utils";

vi.mock("../header-arrow-button/header-arrow-button", () => ({
  default: ({ text, href, direction }: HeaderArrowButtonProps) => (
    <a data-testid={`header-arrow-${direction}`} href={href}>
      {text}
    </a>
  ),
}));

describe("HeaderComponent", () => {
  it("renders the default title when no title prop is given", async () => {
    const screen = await render(<HeaderComponent />);
    await expect.element(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
  });

  it("renders a custom title", async () => {
    const screen = await render(<HeaderComponent title="Artists" />);
    await expect.element(screen.getByRole("heading")).toHaveTextContent("Artists");
  });

  it("does not render a left arrow when backButton is not provided", async () => {
    const screen = await render(<HeaderComponent />);
    await expect.element(screen.getByTestId("header-arrow-left")).not.toBeInTheDocument();
  });

  it("renders a left arrow with the correct label when backButton is provided", async () => {
    const screen = await render(<HeaderComponent backButton={{ label: "Library" }} />);
    await expect
      .element(screen.getByTestId("header-arrow-left"))
      .toHaveTextContent("Library");
  });

  it("defaults the back button href to '..' when no href is given", async () => {
    const screen = await render(<HeaderComponent backButton={{ label: "Library" }} />);
    await expect
      .element(screen.getByTestId("header-arrow-left"))
      .toHaveAttribute("href", "..");
  });

  it("uses the provided href for the back button", async () => {
    const screen = await render(
      <HeaderComponent backButton={{ label: "Library", href: "/music/library" }} />,
    );
    await expect
      .element(screen.getByTestId("header-arrow-left"))
      .toHaveAttribute("href", "/music/library");
  });

  it("always renders the Now Playing right arrow linking to /music/player", async () => {
    const screen = await render(<HeaderComponent />);
    const nowPlaying = screen.getByTestId("header-arrow-right");
    await expect.element(nowPlaying).toBeInTheDocument();
    await expect.element(nowPlaying).toHaveAttribute("href", "/music/player");
  });
});

describe("Header (router integration)", () => {
  it("falls back to defaults when the last match has no context", async () => {
    const screen = await renderWithRouter(<Header />);
    await expect.element(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
    await expect.element(screen.getByTestId("header-arrow-left")).not.toBeInTheDocument();
  });

  it("falls back to defaults when the last match context has no header key", async () => {
    const screen = await renderWithRouter(<Header />, { someOtherKey: true });
    await expect.element(screen.getByRole("heading")).toHaveTextContent(SKEUOMUSIC);
    await expect.element(screen.getByTestId("header-arrow-left")).not.toBeInTheDocument();
  });

  it("renders the title from route context header", async () => {
    const screen = await renderWithRouter(<Header />, { header: { title: "Albums" } });
    await expect.element(screen.getByRole("heading")).toHaveTextContent("Albums");
  });

  it("renders the back button from route context header", async () => {
    const screen = await renderWithRouter(<Header />, {
      header: { backButton: { label: "Library", href: "/music/library" } },
    });
    const backButton = screen.getByTestId("header-arrow-left");
    await expect.element(backButton).toHaveTextContent("Library");
    await expect.element(backButton).toHaveAttribute("href", "/music/library");
  });
});

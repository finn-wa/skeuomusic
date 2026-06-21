import { describe, expect, it, vi } from "vitest";
import HeaderArrowButton, { type HeaderArrowButtonProps } from "./header-arrow-button";
import { renderWithRouter } from "@/test/router-utils";

const defaultProps = {
  href: "/music/artists",
  text: "Artists",
} satisfies Partial<HeaderArrowButtonProps>;

describe("HeaderArrowButton", () => {
  describe("early returns", () => {
    it("renders nothing when hide is true", async () => {
      const { container } = await renderWithRouter(
        <HeaderArrowButton {...defaultProps} direction="left" hide />,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("renders nothing when text is omitted", async () => {
      const { container } = await renderWithRouter(
        <HeaderArrowButton href="/music/artists" direction="left" />,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("link and text", () => {
    it("renders a link pointing to href", async () => {
      const screen = await renderWithRouter(
        <HeaderArrowButton {...defaultProps} direction="right" />,
      );
      await expect
        .element(screen.getByRole("link"))
        .toHaveAttribute("href", defaultProps.href);
    });

    it("renders the label text", async () => {
      const screen = await renderWithRouter(
        <HeaderArrowButton {...defaultProps} direction="left" text="Albums" />,
      );
      await expect.element(screen.getByRole("link")).toHaveTextContent("Albums");
    });
  });

  describe("appearance", { tags: "visual" }, () => {
    it("points left when direction=left", { tags: "visual" }, async () => {
      const screen = await renderWithRouter(
        <div style={{ display: "flex" }}>
          <HeaderArrowButton {...defaultProps} text="Radiohead" direction="left" />,
        </div>,
      );
      await expect(screen.getByRole("link")).toMatchScreenshot(
        "header-arrow-secondary-left",
      );
    });

    it("points right when direction=right", { tags: "visual" }, async () => {
      const screen = await renderWithRouter(
        <div style={{ display: "flex" }}>
          <HeaderArrowButton {...defaultProps} direction="right" />
        </div>,
      );
      await expect(screen.getByRole("link")).toMatchScreenshot(
        "header-arrow-secondary-right",
      );
    });

    it("applies player styling when kind=player", { tags: "visual" }, async () => {
      const screen = await renderWithRouter(
        <div style={{ display: "flex" }}>
          <HeaderArrowButton
            href="/player"
            text="Radiohead"
            kind="player"
            direction="left"
          />
        </div>,
      );
      await expect(screen.getByRole("link")).toMatchScreenshot(
        "header-arrow-player-left",
      );
    });

    it("applies primary styling when kind=primary", { tags: "visual" }, async () => {
      const screen = await renderWithRouter(
        <div style={{ display: "flex" }}>
          <HeaderArrowButton
            {...defaultProps}
            text="Now Playing"
            direction="right"
            kind="primary"
          />
        </div>,
      );
      await expect(screen.getByRole("link")).toMatchScreenshot(
        "header-arrow-primary-right",
      );
    });

    it("applies secondary styling when kind=secondary", { tags: "visual" }, async () => {
      const screen = await renderWithRouter(
        <div style={{ display: "flex" }}>
          <HeaderArrowButton
            {...defaultProps}
            text="Radiohead"
            kind="secondary"
            direction="left"
          />
        </div>,
      );
      await expect(screen.getByRole("link")).toMatchScreenshot(
        "header-arrow-secondary-left",
      );
    });
  });

  describe("SVG sizing", () => {
    it("SVG width uses clientWidth after mount", async () => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(80);
      const { container } = await renderWithRouter(
        <HeaderArrowButton {...defaultProps} direction="left" text="Artists" />,
      );
      const widthValue = parseFloat(
        container.querySelector("svg")?.getAttribute("width") ?? "",
      );
      expect(widthValue).toBe(80 + 24);
    });
  });
});

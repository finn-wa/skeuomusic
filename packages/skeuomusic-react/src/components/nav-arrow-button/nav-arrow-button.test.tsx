import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavArrowButton from "./nav-arrow-button";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  const { MockLink } = await import("@/test/mocks/link");
  return { ...actual, Link: MockLink, useLocation: vi.fn<() => string>(() => "/music/library") };
});

const defaultProps = { href: "/music/artists", direction: "left" as const, text: "Artists" };

describe("early returns", () => {
  it("renders nothing when hide is true", () => {
    const { container } = render(<NavArrowButton {...defaultProps} hide />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when text is omitted", () => {
    const { container } = render(<NavArrowButton href="/music/artists" direction="left" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("link and text", () => {
  it("renders a link pointing to href", () => {
    render(<NavArrowButton {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/music/artists");
  });

  it("renders the label text", () => {
    render(<NavArrowButton {...defaultProps} text="Albums" />);
    expect(screen.getByRole("link")).toHaveTextContent("Albums");
  });

  it("renders an SVG with title Arrow", () => {
    render(<NavArrowButton {...defaultProps} />);
    expect(screen.getByTitle("Arrow")).toBeInTheDocument();
  });
});

describe("direction prop", () => {
  it("applies the left class to the link for direction=left", () => {
    render(<NavArrowButton {...defaultProps} direction="left" />);
    expect(screen.getByRole("link")).toHaveClass("left");
  });

  it("applies the right class to the link for direction=right", () => {
    render(<NavArrowButton {...defaultProps} direction="right" />);
    expect(screen.getByRole("link")).toHaveClass("right");
  });

  it("arrow path has no transform for direction=left", () => {
    const { container } = render(<NavArrowButton {...defaultProps} direction="left" />);
    const path = container.querySelector("defs path");
    expect(path).not.toHaveAttribute("transform");
  });

  it("arrow path has a transform for direction=right", () => {
    const { container } = render(<NavArrowButton {...defaultProps} direction="right" />);
    const path = container.querySelector("defs path");
    expect(path).toHaveAttribute("transform");
  });
});

describe("kind prop", () => {
  it("defaults to secondary class when kind is not provided", () => {
    render(<NavArrowButton {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveClass("secondary");
  });

  it("applies primary class when kind=primary", () => {
    render(<NavArrowButton {...defaultProps} kind="primary" />);
    expect(screen.getByRole("link")).toHaveClass("primary");
  });

  it("applies player class when kind=player", () => {
    render(<NavArrowButton {...defaultProps} kind="player" />);
    expect(screen.getByRole("link")).toHaveClass("player");
  });

  it("feFlood has floodColor black for kind=secondary", () => {
    const { container } = render(<NavArrowButton {...defaultProps} kind="secondary" />);
    const feFlood = container.querySelector("feFlood");
    expect(feFlood).toHaveAttribute("flood-color", "black");
  });

  it("feFlood has floodColor white for kind=player", () => {
    const { container } = render(<NavArrowButton {...defaultProps} kind="player" />);
    const feFlood = container.querySelector("feFlood");
    expect(feFlood).toHaveAttribute("flood-color", "white");
  });
});

describe("SVG sizing", () => {
  it("SVG width uses clientWidth after mount", () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(80);
    const { container } = render(<NavArrowButton {...defaultProps} text="Artists" />);
    const widthValue = parseFloat(container.querySelector("svg")?.getAttribute("width") ?? "");
    expect(widthValue).toBe(80 + 24);
  });
});

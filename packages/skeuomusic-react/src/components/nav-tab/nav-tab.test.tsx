import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavTab from "./nav-tab";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  const { MockLink } = await import("@/test/mocks/link");
  return { ...actual, Link: MockLink };
});

describe("NavTab", () => {
  it("renders a link", () => {
    render(<NavTab route="/music/library/songs" label="Songs" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("links to the provided route", () => {
    render(<NavTab route="/music/library/songs" label="Songs" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      expect.stringContaining("/music/library/songs"),
    );
  });

  it("includes the initial scroll hash in the href", () => {
    render(<NavTab route="/music/library/songs" label="Songs" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", expect.stringContaining("#1"));
  });

  it("renders the label text", () => {
    render(<NavTab route="/music/library/songs" label="Songs" />);
    expect(screen.getByText("Songs")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <NavTab route="/music/library/songs" label="Songs">
        <svg data-testid="tab-icon" />
      </NavTab>,
    );
    expect(screen.getByTestId("tab-icon")).toBeInTheDocument();
  });
});

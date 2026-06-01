import { render } from "vitest-browser-react";
import { describe, expect, it, vi } from "vitest";
import NavTab from "./nav-tab";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  const { MockLink } = await import("@/test/mocks/link");
  return { ...actual, Link: MockLink };
});

describe("NavTab", () => {
  it("renders a link", async () => {
    const screen = await render(<NavTab route="/music/library/songs" label="Songs" />);
    await expect.element(screen.getByRole("link")).toBeInTheDocument();
  });

  it("links to the provided route", async () => {
    const screen = await render(<NavTab route="/music/library/songs" label="Songs" />);
    await expect
      .element(screen.getByRole("link"))
      .toHaveAttribute("href", expect.stringContaining("/music/library/songs"));
  });

  it("includes the initial scroll hash in the href", async () => {
    const screen = await render(<NavTab route="/music/library/songs" label="Songs" />);
    await expect
      .element(screen.getByRole("link"))
      .toHaveAttribute("href", expect.stringContaining("#1"));
  });

  it("renders the label text", async () => {
    const screen = await render(<NavTab route="/music/library/songs" label="Songs" />);
    await expect.element(screen.getByText("Songs")).toBeInTheDocument();
  });

  it("renders children", async () => {
    const screen = await render(
      <NavTab route="/music/library/songs" label="Songs">
        <svg data-testid="tab-icon" />
      </NavTab>,
    );
    await expect.element(screen.getByTestId("tab-icon")).toBeInTheDocument();
  });
});

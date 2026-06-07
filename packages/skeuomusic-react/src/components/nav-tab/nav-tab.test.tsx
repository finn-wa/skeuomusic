import { describe, expect, it } from "vitest";
import NavTab from "./nav-tab";
import { renderWithRouter } from "@/test/router-utils";

describe("NavTab", () => {
  it("renders a link", async () => {
    const screen = await renderWithRouter(<NavTab route="/music/library/songs" label="Songs" />);
    await expect.element(screen.getByRole("link")).toBeInTheDocument();
  });

  it("links to the provided route", async () => {
    const screen = await renderWithRouter(<NavTab route="/music/library/songs" label="Songs" />);
    await expect
      .element(screen.getByRole("link"))
      .toHaveAttribute("href", expect.stringContaining("/music/library/songs"));
  });

  it("includes the initial scroll hash in the href", async () => {
    const screen = await renderWithRouter(<NavTab route="/music/library/songs" label="Songs" />);
    await expect
      .element(screen.getByRole("link"))
      .toHaveAttribute("href", expect.stringContaining("#1"));
  });

  it("renders the label text", async () => {
    const screen = await renderWithRouter(<NavTab route="/music/library/songs" label="Songs" />);
    await expect.element(screen.getByText("Songs")).toBeInTheDocument();
  });

  it("renders children", async () => {
    const screen = await renderWithRouter(
      <NavTab route="/music/library/songs" label="Songs">
        <svg data-testid="tab-icon" />
      </NavTab>,
    );
    await expect.element(screen.getByTestId("tab-icon")).toBeInTheDocument();
  });
});

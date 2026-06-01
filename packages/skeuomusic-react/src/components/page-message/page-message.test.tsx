import { render } from "vitest-browser-react";
import { describe, expect, it } from "vitest";
import PageMessage from "./page-message";

describe("PageMessage", () => {
  it("renders the message", async () => {
    const screen = await render(<PageMessage message="It's a page message" />);
    await expect.element(screen.getByText("It's a page message")).toBeInTheDocument();
  });

  it("renders children", async () => {
    const screen = await render(
      <PageMessage>
        <span role="note">
          <span>Some</span>
          <i> custom </i>
          <span>text</span>
        </span>
      </PageMessage>,
    );
    await expect.element(screen.getByRole("note")).toHaveTextContent("Some custom text");
  });

  it("renders the message prop instead of children if both are supplied", async () => {
    const screen = await render(
      <PageMessage message="Precedence">
        <span role="note">
          <span>Some</span>
          <i>custom</i>
          <span>text</span>
        </span>
      </PageMessage>,
    );
    await expect.element(screen.getByText("Precedence")).toBeInTheDocument();
    await expect.element(screen.getByRole("note")).not.toBeInTheDocument();
  });
});

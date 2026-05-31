import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageMessage from "./page-message";

describe("PageMessage", () => {
  it("renders the message", () => {
    render(<PageMessage message="It's a page message" />);
    expect(screen.getByText("It's a page message")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <PageMessage>
        <span role="note">
          <span>Some</span>
          <i> custom </i>
          <span>text</span>
        </span>
      </PageMessage>,
    );
    expect(screen.getByRole("note")).toHaveTextContent("Some custom text");
  });

  it("renders the message prop instead of children if both are supplied", () => {
    render(
      <PageMessage message="Precedence">
        <span role="note">
          <span>Some</span>
          <i>custom</i>
          <span>text</span>
        </span>
      </PageMessage>,
    );
    expect(screen.getByText("Precedence")).toBeInTheDocument();
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});

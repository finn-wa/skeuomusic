import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  function setup(initialQuery = "") {
    const querySignal = createSignal(initialQuery);
    const renderResult = render(() => <SearchInput query={querySignal} />);
    return { querySignal, renderResult };
  }

  it("shows the initial value", async () => {
    const {
      querySignal: [query],
      renderResult: { getByRole },
    } = setup("initial");

    const input = getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("initial");

    await userEvent.clear(input);
    await userEvent.type(input, "hello");

    expect(query()).toBe("hello");
    expect(input).toHaveValue("hello");
  });

  it("updates the signal on input", async () => {
    const {
      querySignal: [query],
      renderResult: { getByRole },
    } = setup();

    const input = getByRole("searchbox");
    await userEvent.type(input, "hello");
    expect(query()).toBe("hello");
    expect(input).toHaveValue("hello");

    await userEvent.clear(input);
    expect(query()).toBe("");
    expect(input).toHaveValue("");
  });

  it("has a reset button that is only shown when the query is not empty", async () => {
    const {
      querySignal: [query],
      renderResult: { getByRole, getByTestId },
    } = setup();

    expect(query()).toBe("");

    const resetButton = getByTestId("clearSearch");
    expect(resetButton).not.toBeVisible();

    const input = getByRole("searchbox");
    await userEvent.type(input, "hello");

    expect(resetButton).toBeVisible();

    await userEvent.click(resetButton);
    expect(query()).toBe("");
    expect(input).toHaveValue("");

    expect(resetButton).not.toBeVisible();
  });
});

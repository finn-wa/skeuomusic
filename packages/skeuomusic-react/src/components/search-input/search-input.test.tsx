import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { describe, it, expect, vi } from "vitest";
import SearchInput from "./search-input";

describe("SearchInput", () => {
  it("renders a search input with a Search placeholder", async () => {
    const screen = await render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await expect.element(input).toBeInTheDocument();
    await expect.element(input).toHaveAttribute("placeholder", "Search");
  });

  it("calls onQueryChanged with the current value on input", async () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    const screen = await render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await userEvent.fill(input, "hello");
    expect(onQueryChanged).toHaveBeenCalledWith("hello");
  });

  it("calls onQueryChanged on each keystroke with the accumulated value", async () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    const screen = await render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await userEvent.type(input, "abc");
    expect(onQueryChanged).toHaveBeenNthCalledWith(1, "a");
    expect(onQueryChanged).toHaveBeenNthCalledWith(2, "ab");
    expect(onQueryChanged).toHaveBeenNthCalledWith(3, "abc");
  });

  it("input shows placeholder when empty and hides it when a value is present", async () => {
    const screen = await render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await expect.element(input).toHaveValue("");
    await userEvent.fill(input, "rock");
    await expect.element(input).toHaveValue("rock");
  });

  it("clear button is hidden when the input is empty and visible after typing", async () => {
    const screen = await render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await expect
      .element(screen.getByRole("button", { name: "Clear search" }))
      .not.toBeInTheDocument();
    await userEvent.fill(input, "rock");
    await expect.element(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("clicking the clear button clears the input and calls onQueryChanged with empty string", async () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    const screen = await render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await userEvent.fill(input, "rock");
    await expect.element(input).toHaveValue("rock");
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    await expect.element(input).toHaveValue("");
    expect(onQueryChanged).toHaveBeenLastCalledWith("");
  });

  it("should match screenshot without input", { tags: "visual" }, async () => {
    const screen = await render(<SearchInput onQueryChanged={() => {}} />);
    await expect(screen.getByTestId("search")).toMatchScreenshot("search-input");
  });

  it("should match screenshot with input", { tags: "visual" }, async () => {
    const screen = await render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    await userEvent.fill(input, "radiohead");
    await expect(screen.getByTestId("search")).toMatchScreenshot("search-input-filled");
  });
});

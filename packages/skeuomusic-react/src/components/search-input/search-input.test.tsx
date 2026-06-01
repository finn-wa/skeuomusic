import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchInput from "./search-input";

describe("SearchInput", () => {
  it("renders a search input with a Search placeholder", () => {
    render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search");
  });

  it("calls onQueryChanged with the current value on input", () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    fireEvent.input(input, { target: { value: "hello" } });
    expect(onQueryChanged).toHaveBeenCalledWith("hello");
  });

  it("calls onQueryChanged on each keystroke with the accumulated value", () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    fireEvent.input(input, { target: { value: "a" } });
    fireEvent.input(input, { target: { value: "ab" } });
    fireEvent.input(input, { target: { value: "abc" } });
    expect(onQueryChanged).toHaveBeenNthCalledWith(1, "a");
    expect(onQueryChanged).toHaveBeenNthCalledWith(2, "ab");
    expect(onQueryChanged).toHaveBeenNthCalledWith(3, "abc");
  });

  it("renders the clear button in the DOM", () => {
    render(<SearchInput onQueryChanged={() => {}} />);
    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("input shows placeholder when empty and hides it when a value is present", () => {
    render(<SearchInput onQueryChanged={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search" }) as HTMLInputElement;
    expect(input.value).toBe("");
    fireEvent.input(input, { target: { value: "rock" } });
    expect(input.value).toBe("rock");
  });

  it("clicking the clear button clears the input and calls onQueryChanged with empty string", () => {
    const onQueryChanged = vi.fn<(value: string) => void>();
    render(<SearchInput onQueryChanged={onQueryChanged} />);
    const input = screen.getByRole("searchbox", { name: "Search" }) as HTMLInputElement;
    fireEvent.input(input, { target: { value: "rock" } });
    expect(input.value).toBe("rock");
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input.value).toBe("");
    expect(onQueryChanged).toHaveBeenLastCalledWith("");
  });
});

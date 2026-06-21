import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import HeaderButton from "./header-button";

describe("HeaderButton", () => {
  it("dims the text to 50% opacity when disabled", async () => {
    const screen = await render(<HeaderButton type="button" text="Done" disabled />);
    const text = screen.getByText("Done");
    await expect.poll(() => getComputedStyle(text.element()).opacity).toBe("0.5");
  });

  it("renders the label text", async () => {
    const screen = await render(<HeaderButton type="button" text="Done" />);
    await expect.element(screen.getByRole("button")).toHaveTextContent("Done");
  });

  describe("type=button", () => {
    it("calls onClick when clicked", async () => {
      const onClick = vi.fn<() => void>();
      const screen = await render(
        <HeaderButton type="button" text="Done" onClick={onClick} />,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("is disabled and does not fire onClick when disabled", async () => {
      const onClick = vi.fn<() => void>();
      const screen = await render(
        <HeaderButton type="button" text="Done" onClick={onClick} disabled />,
      );
      const button = screen.getByRole("button");
      await expect.element(button).toBeDisabled();
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
  // TODO: type: submit
});

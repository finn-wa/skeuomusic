import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import SlideToUnlock from "./slide-to-unlock";

// We cannot test dragging to unlock in vitest until this is implemented:
// https://github.com/vitest-dev/vitest/issues/7836
describe("SlideToUnlock", () => {
  it("renders the default text", async () => {
    const screen = await render(<SlideToUnlock onUnlock={() => {}} />);
    await expect
      .element(screen.getByRole("button", { name: /slide to unlock/i }))
      .toBeInTheDocument();
  });

  it("renders custom text via the text prop", async () => {
    const screen = await render(
      <SlideToUnlock onUnlock={() => {}} text="slide to set up" />,
    );
    await expect
      .element(screen.getByRole("button", { name: /slide to set up/i }))
      .toBeInTheDocument();
  });

  it("calls onUnlock when the text button is clicked", async () => {
    const onUnlock = vi.fn<() => void>();
    const screen = await render(<SlideToUnlock onUnlock={() => onUnlock()} />);
    expect(onUnlock).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: /slide to unlock/i }));
    await expect.poll(() => onUnlock).toHaveBeenCalled();
  });

  it("plays an audio effect when the text button is clicked", async () => {
    vi.spyOn(Audio.prototype, "play").mockResolvedValue(undefined);
    const screen = await render(<SlideToUnlock onUnlock={() => {}} />);
    expect(Audio.prototype.play).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: /slide to unlock/i }));
    await expect.poll(() => Audio.prototype.play).toHaveBeenCalledOnce();
  });

  it("should match screenshot", { tags: "visual" }, async () => {
    const screen = await render(<SlideToUnlock onUnlock={() => {}} />);
    await expect(screen.getByTestId("unlock-slider")).toMatchScreenshot("unlock-slider");
  });
});

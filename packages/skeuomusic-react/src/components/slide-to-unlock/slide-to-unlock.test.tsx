import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SlideToUnlock from "./slide-to-unlock";

// Arrow functions cannot be used as constructors, so we need a regular function here.
// The component calls `new Audio(...)`, which requires a constructable mock.
function makeAudioMock(play = vi.fn<() => void>().mockResolvedValue(undefined)) {
  const AudioMock = function (this: any) {
    this.play = play;
  };
  return { AudioMock, play };
}

beforeEach(() => {
  const { AudioMock } = makeAudioMock();
  vi.stubGlobal("Audio", AudioMock);
});

describe("SlideToUnlock", () => {
  it("renders the default text", () => {
    render(<SlideToUnlock onUnlock={vi.fn<() => void>()} />);
    expect(screen.getByRole("button", { name: /slide to unlock/i })).toBeInTheDocument();
  });

  it("renders custom text via the text prop", () => {
    render(<SlideToUnlock onUnlock={vi.fn<() => void>()} text="slide to set up" />);
    expect(screen.getByRole("button", { name: /slide to set up/i })).toBeInTheDocument();
  });

  it("calls onUnlock when the text button is clicked", () => {
    const onUnlock = vi.fn<() => void>();
    render(<SlideToUnlock onUnlock={onUnlock} />);
    expect(onUnlock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /slide to unlock/i }));
    expect(onUnlock).toHaveBeenCalledOnce();
  });

  it("plays an audio effect when the text button is clicked", () => {
    const { AudioMock, play } = makeAudioMock();
    vi.stubGlobal("Audio", AudioMock);
    render(<SlideToUnlock onUnlock={vi.fn<() => void>()} />);
    fireEvent.click(screen.getByRole("button", { name: /slide to unlock/i }));
    expect(play).toHaveBeenCalledOnce();
  });
});

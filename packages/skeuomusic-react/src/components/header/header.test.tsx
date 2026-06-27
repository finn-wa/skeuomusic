import { SKEUOMUSIC } from "@/shared/constants";
import { describe, expect, it, vi } from "vitest";
import Header, { HeaderComponent } from "./header";
import { renderWithRouter } from "@/test/router-utils";
import { HeaderContext, type HeaderContextValue } from "@/shared/context/header";

function renderHeaderWithContext(state: Partial<HeaderContextValue>) {
  const contextValue: HeaderContextValue = {
    title: SKEUOMUSIC,
    setHeaderState:
      vi.fn<(value: Parameters<HeaderContextValue["setHeaderState"]>[0]) => void>(),
    ...state,
  };
  return renderWithRouter(
    <HeaderContext.Provider value={contextValue}>
      <Header />
    </HeaderContext.Provider>,
  );
}

describe("HeaderComponent", () => {
  it("renders the title", async () => {
    const screen = await renderWithRouter(<HeaderComponent title="Artists" />);
    await expect.element(screen.getByRole("heading")).toHaveTextContent("Artists");
  });

  it("does not render a left arrow when leftButton is not provided", async () => {
    const screen = await renderWithRouter(<HeaderComponent title={SKEUOMUSIC} />);
    await expect.element(screen.getByTestId("header-arrow-left")).not.toBeInTheDocument();
  });

  it("renders a left arrow with the correct label when leftButton is provided", async () => {
    const screen = await renderWithRouter(
      <HeaderComponent title={SKEUOMUSIC} leftButton={{ label: "Library" }} />,
    );
    await expect
      .element(screen.getByTestId("header-arrow-left"))
      .toHaveTextContent("Library");
  });

  it("renders the left arrow even when no href is explicitly given", async () => {
    const screen = await renderWithRouter(
      <HeaderComponent title={SKEUOMUSIC} leftButton={{ label: "Library" }} />,
    );
    await expect.element(screen.getByTestId("header-arrow-left")).toBeInTheDocument();
  });

  it("uses the provided href for the back button", async () => {
    const screen = await renderWithRouter(
      <HeaderComponent
        title={SKEUOMUSIC}
        leftButton={{ label: "Library", href: "/music/library" }}
      />,
    );
    await expect
      .element(screen.getByTestId("header-arrow-left"))
      .toHaveAttribute("href", "/music/library");
  });

  it("renders the Now Playing right arrow by default", async () => {
    const screen = await renderWithRouter(<HeaderComponent title={SKEUOMUSIC} />);
    const nowPlaying = screen.getByTestId("header-arrow-right");
    await expect.element(nowPlaying).toBeInTheDocument();
    await expect.element(nowPlaying).toHaveAttribute("href", "/music/player");
  });

  it("renders a HeaderButton and no arrow when rightButton kind is submit", async () => {
    const screen = await renderWithRouter(
      <HeaderComponent
        title={SKEUOMUSIC}
        rightButton={{ kind: "submit", label: "Save", formId: "my-form" }}
      />,
    );
    await expect.element(screen.getByTestId("header-button")).toHaveTextContent("Save");
    await expect
      .element(screen.getByTestId("header-arrow-right"))
      .not.toBeInTheDocument();
  });
});

describe("Header (context integration)", () => {
  it("renders the title from context", async () => {
    const screen = await renderHeaderWithContext({ title: "Albums" });
    await expect.element(screen.getByRole("heading")).toHaveTextContent("Albums");
  });

  it("renders the left button from context", async () => {
    const screen = await renderHeaderWithContext({
      leftButton: { label: "Library", href: "/music/library" },
    });
    const backButton = screen.getByTestId("header-arrow-left");
    await expect.element(backButton).toHaveTextContent("Library");
    await expect.element(backButton).toHaveAttribute("href", "/music/library");
  });

  it("renders a submit button from context", async () => {
    const screen = await renderHeaderWithContext({
      rightButton: { kind: "submit", label: "Save", formId: "settings-form" },
    });
    await expect.element(screen.getByTestId("header-button")).toHaveTextContent("Save");
  });
});

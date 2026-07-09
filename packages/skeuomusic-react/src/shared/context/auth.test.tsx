import { render } from "vitest-browser-react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { makeSubsonicAuthState } from "@/test/subsonic";
import { useSubsonicAuthState } from "./auth";
import { renderWithAuth } from "@/test/router-utils";

/** Calls the hook and renders a value from the returned state. */
function Probe() {
  const state = useSubsonicAuthState();
  return <div data-testid="username">{state.config.username}</div>;
}

// React logs caught errors to the console regardless — suppress during the
// tests that deliberately throw during render.
function suppressConsoleError() {
  vi.spyOn(console, "error").mockImplementation(() => {});
}

describe("useSubsonicAuthState", () => {
  it("returns the subsonic auth state when it is initialised", async () => {
    const screen = await renderWithAuth(<Probe />, {
      state: makeSubsonicAuthState({
        config: {
          url: "https://music.example.com",
          username: "alice",
          password: "secret",
          dangerouslySavePassword: false,
        },
      }),
    });
    await expect.element(screen.getByTestId("username")).toHaveTextContent("alice");
  });

  it("throws when the subsonic state is null", async () => {
    suppressConsoleError();
    const screen = await renderWithAuth(
      <ErrorBoundary name="test" fallback={({ error }) => <p>{String(error)}</p>}>
        <Probe />
      </ErrorBoundary>,
      { state: null },
    );
    await expect
      .element(screen.getByText(/subsonic state is not initialised/))
      .toBeInTheDocument();
  });

  it("throws when there is no auth provider at all", async () => {
    suppressConsoleError();
    const screen = await render(
      <ErrorBoundary name="test" fallback={({ error }) => <p>{String(error)}</p>}>
        <Probe />
      </ErrorBoundary>,
    );
    await expect
      .element(screen.getByText(/was used outside a provider/))
      .toBeInTheDocument();
  });
});

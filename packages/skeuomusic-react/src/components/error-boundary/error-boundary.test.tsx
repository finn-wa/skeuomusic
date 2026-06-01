import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./error-boundary";

function Throws({ error }: { error: unknown }): never {
  throw error;
}

// React logs caught errors to the console regardless — suppress during these tests
function suppressConsoleError() {
  vi.spyOn(console, "error").mockImplementation(() => {});
}

describe("ErrorBoundary", () => {
  describe("normal render", () => {
    it("renders children when no error is thrown", () => {
      render(
        <ErrorBoundary name="test" fallback={<p>Error</p>}>
          <span>Hello</span>
        </ErrorBoundary>,
      );
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("does not render the fallback when no error is thrown", () => {
      render(
        <ErrorBoundary name="test" fallback={<p>Error</p>}>
          <span>Hello</span>
        </ErrorBoundary>,
      );
      expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });
  });

  describe("fallback rendering", () => {
    it("renders a ReactNode fallback when a child throws", () => {
      suppressConsoleError();
      render(
        <ErrorBoundary name="test" fallback={<p>Something went wrong</p>}>
          <Throws error={new Error("boom")} />
        </ErrorBoundary>,
      );
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("renders a function fallback with the caught error", () => {
      suppressConsoleError();
      const error = new Error("boom");
      render(
        <ErrorBoundary name="test" fallback={({ error }) => <p>{String(error)}</p>}>
          <Throws error={error} />
        </ErrorBoundary>,
      );
      expect(screen.getByText("Error: boom")).toBeInTheDocument();
    });

    it("passes non-Error values through to a function fallback", () => {
      suppressConsoleError();
      render(
        <ErrorBoundary name="test" fallback={({ error }) => <p>{String(error)}</p>}>
          <Throws error="string error" />
        </ErrorBoundary>,
      );
      expect(screen.getByText("string error")).toBeInTheDocument();
    });

    it("stops rendering children after an error", () => {
      suppressConsoleError();
      render(
        <ErrorBoundary name="test" fallback={<p>Fallback</p>}>
          <Throws error={new Error("boom")} />
        </ErrorBoundary>,
      );
      expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    });
  });

  describe("onError callback", () => {
    it("calls onError with the error and info when provided", () => {
      suppressConsoleError();
      const onError = vi.fn<() => void>();
      const error = new Error("boom");
      render(
        <ErrorBoundary name="test" fallback={<p>Error</p>} onError={onError}>
          <Throws error={error} />
        </ErrorBoundary>,
      );
      expect(onError).toHaveBeenCalledOnce();
      expect(onError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({ componentStack: expect.any(String) }),
      );
    });

    it("does not call anything when onError is omitted", () => {
      const consoleSpy = vi.spyOn(console, "error");
      render(
        <ErrorBoundary name="test" fallback={<p>Error</p>}>
          <Throws error={new Error("boom")} />
        </ErrorBoundary>,
      );
      const calls = consoleSpy.mock.calls.flat();
      expect(calls).not.toContain(expect.stringContaining("ErrorBoundary:"));
    });

    it("logs to console.error with the boundary name and stack when onError is 'log'", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const error = new Error("boom");
      render(
        <ErrorBoundary name="my-boundary" fallback={<p>Error</p>} onError="log">
          <Throws error={error} />
        </ErrorBoundary>,
      );
      const [message, logged] =
        consoleSpy.mock.calls.find(
          ([msg]) => typeof msg === "string" && msg.includes("ErrorBoundary:"),
        ) ?? [];
      expect(message).toContain("my-boundary");
      expect(message).toContain("Stack:");
      expect(logged).toBe(error);
    });
  });
});

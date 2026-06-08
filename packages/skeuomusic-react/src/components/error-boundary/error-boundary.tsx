import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";
import { Component } from "react";

export type FallbackProps = {
  error: unknown;
};

export type ErrorBoundaryProps = PropsWithChildren<{
  /** A name for debugging */
  name: string;
  /** Optional callback for tracing errors. Or use 'log' to print the default message. */
  onError?: ((error: unknown, info: ErrorInfo) => void) | "log";
  /** Content to render in place of an error. */
  fallback: ((props: FallbackProps) => ReactNode) | ReactNode;
}>;

type ErrorBoundaryState =
  | { hasError: true; error: unknown }
  | { hasError: false; error: null };

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (this.props.onError == null) {
      return;
    }
    if (typeof this.props.onError === "function") {
      this.props.onError(error, info);
      return;
    }
    if (this.props.onError === "log") {
      console.error(
        `ErrorBoundary: Caught error in ${this.props.name}\nStack: ${info.componentStack}`,
        error,
      );
    }
  }

  render(): ReactNode {
    const { children, fallback } = this.props;
    const { hasError, error } = this.state;

    let childToRender = children;
    if (hasError) {
      childToRender = typeof fallback === "function" ? fallback({ error }) : fallback;
    }
    return childToRender;
  }
}

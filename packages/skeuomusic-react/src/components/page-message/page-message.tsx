import type { PropsWithChildren } from "react";

export type PageMessageProps = PropsWithChildren<{
  message?: string;
}>;

/**
 * Renders text in the centre of the page. It accepts a message prop, or
 * renders child elements if the message is undefined. Children should
 * only contain text.
 */
export default function PageMessage({ message, children }: PageMessageProps) {
  return (
    <div className="page-msg-container">
      <span className="page-msg">{message ?? children}</span>
    </div>
  );
}

export const LoadingPage = () => <PageMessage message="Loading..." />;

export const ErrorPage = ({ message = "An error occurred" }: { message?: string }) => (
  <PageMessage message={message} />
);

export function LoginHintPage() {
  return <PageMessage message="Go to More to set up" />;
}

import { type ParentProps, children } from "solid-js";

export type PageMessageProps = ParentProps<{
  message?: string;
}>;

export default function PageMessage(props: PageMessageProps) {
  const resolvedChildren = children(() => props.children);
  return (
    <div class="page-msg-container">
      <span class="page-msg">
        {props.message ? props.message : resolvedChildren()}
      </span>
    </div>
  );
}

export const LoadingPage = () => <PageMessage message="Loading..." />;

export const ErrorPage = ({
  message = "An error occurred",
}: { message?: string }) => <PageMessage message={message} />;

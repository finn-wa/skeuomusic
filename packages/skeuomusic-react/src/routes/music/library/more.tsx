import { useAuth } from "@/auth";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import PageMessage, { ErrorPage } from "@/components/page-message/page-message";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music/library/more")({
  component: MoreRouteComponent,
});

function MoreRouteComponent() {
  return (
    <ErrorBoundary name="MoreComponent" fallback={<ErrorPage />} onError="log">
      <MoreComponent />
    </ErrorBoundary>
  );
}

function MoreComponent() {
  const auth = useAuth();
  return (
    <PageMessage
      message={auth.subsonic.state == null ? "Not logged in" : "Logged in with subsonic"}
    />
  );
}

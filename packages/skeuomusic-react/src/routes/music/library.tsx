import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header/header";
import NavBar from "@/components/nav-bar/nav-bar";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { ErrorPage } from "@/components/page-message/page-message";

export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/** Provides header and nav tab bar for /music/library routes */
function MusicLibrary() {
  return (
    <>
      <Header />
      <main id="library-content" className="content-frame">
        <ErrorBoundary name="MusicLibrary" fallback={<ErrorPage />} onError="log">
          <Outlet />
        </ErrorBoundary>
      </main>
      <NavBar />
    </>
  );
}

import ErrorBoundary from "@/components/error-boundary/error-boundary";
import Header from "@/components/header/header";
import NavBar from "@/components/nav-bar/nav-bar";
import { ErrorPage } from "@/components/page-message/page-message";
import { SKEUOMUSIC } from "@/shared/constants";
import { HeaderContext, type HeaderState } from "@/shared/context/header";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/**
 * Displays header and nav tab bar around the Outlet for /music/library routes.
 * Provides {@link HeaderContext}.
 */
function MusicLibrary() {
  const { routeHeaderState, pathname } = useRouterState({
    select: (state) => {
      const context = state.matches.at(-1)?.context;
      const routeHeaderState: HeaderState =
        context != null && "header" in context ? context.header : { title: SKEUOMUSIC };
      return { routeHeaderState, pathname: state.location.pathname };
    },
  });
  const [headerStateOverride, setHeaderStateOverride] = useState<HeaderState | null>(
    null,
  );
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setHeaderStateOverride(null);
  }
  const headerState = headerStateOverride ?? routeHeaderState;
  return (
    <HeaderContext value={{ ...headerState, setHeaderState: setHeaderStateOverride }}>
      <Header />
      <main id="library-content" className="content-frame">
        <ErrorBoundary name="MusicLibrary" fallback={<ErrorPage />} onError="log">
          <Outlet />
        </ErrorBoundary>
      </main>
      <NavBar />
    </HeaderContext>
  );
}

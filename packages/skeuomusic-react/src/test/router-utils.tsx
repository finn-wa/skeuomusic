import {
  AuthContext,
  type SubsonicAuthContext,
  type SubsonicAuthState,
} from "@/shared/context/auth";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactElement } from "react";
import { vi } from "vitest";
import { render } from "vitest-browser-react";
import { makeSubsonicAuthState } from "./subsonic";

export async function renderWithRouter(
  ui: ReactElement,
  context?: Record<string, unknown>,
) {
  const rootRoute = createRootRoute({ component: Outlet });
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => ui,
    ...(context != null && { beforeLoad: () => context }),
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([testRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

/**
 * Renders `ui` inside an {@link AuthContext} provider (with a router, via
 * {@link renderWithRouter}, since authed components often use `<Link>`).
 * Pass a partial `state` to override the default fake Subsonic auth state, or
 * `state: null` to simulate a logged-out user.
 */
export function renderWithAuth(
  ui: ReactElement,
  { state = makeSubsonicAuthState() }: { state?: SubsonicAuthState | null } = {},
) {
  return renderWithRouter(
    <AuthContext
      value={{
        subsonic: {
          state,
          login: vi.fn<SubsonicAuthContext["login"]>(),
          logout: vi.fn<SubsonicAuthContext["logout"]>(),
        },
      }}
    >
      {ui}
    </AuthContext>,
  );
}

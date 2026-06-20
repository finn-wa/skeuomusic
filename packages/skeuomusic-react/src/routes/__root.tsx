import type { AuthState } from "@/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});

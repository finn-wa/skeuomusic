import type { AuthContextValue } from "@/shared/context/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});

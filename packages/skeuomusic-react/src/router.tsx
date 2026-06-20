import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const NAV_TAB_ORDER: { [path: string]: number } = {
  "/music/library/playlists": 0,
  "/music/library/artists": 1,
  "/music/library/songs": 2,
  "/music/library/albums": 3,
  "/music/library/more": 4,
};

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    // Provided in main.tsx
    context: { auth: undefined! },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultViewTransition: {
      types: (info) => {
        if (info.fromLocation === undefined || !info.pathChanged) {
          return false;
        }
        const fromOrder = NAV_TAB_ORDER[info.fromLocation.pathname];
        const toOrder = NAV_TAB_ORDER[info.toLocation.pathname];
        if (fromOrder === undefined || toOrder === undefined) {
          return false;
        }
        const delta = fromOrder - toOrder;
        if (delta < 0) {
          // View moves right, content slides left
          return ["slide-left"];
        }
        if (delta > 0) {
          // View moves left, content slides right
          return ["slide-right"];
        }
        return false;
      },
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

import { createRouter as createTanstackSolidRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  return createTanstackSolidRouter({
    routeTree,
    defaultPreload: "intent",
    defaultStaleTime: 5000,
    scrollRestoration: true,
    scrollRestorationBehavior: "instant",
    // defaultHashScrollIntoView: {
    //   behavior: "instant",
    //   block: "start",
    //   inline: "nearest",
    // },
  });
}

export const router = createRouter();

// Register things for typesafety
declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

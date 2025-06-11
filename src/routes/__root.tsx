import { Outlet, createRootRoute } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
  head: () => ({
    meta: [
      { title: "skeuomusic" },
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "64x64",
        href: "/favicon-64.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "128x128",
        href: "/favicon-128.png",
      },
    ],
  }),
});

export function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

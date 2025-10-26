import { createRootRoute, Outlet } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import type { SpotifyAuth } from "spotify-api-client";
import appCss from "~/global.css?url";
import { AuthContext } from "~/lib/client/auth-context";

import "@fontsource-variable/inter";

export const Route = createRootRoute({
  component: () => {
    const [spotifyAuth, setSpotifyAuth] = createSignal<SpotifyAuth>();
    const context: AuthContext = {
      spotifyAuth: spotifyAuth,
      setSpotifyAuth: setSpotifyAuth,
    };

    return (
      <>
        <AuthContext.Provider value={context}>
          <Outlet />
        </AuthContext.Provider>
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
  notFoundComponent: () => <div>404 Not Found</div>,
  head: () => ({
    meta: [
      { title: "skeuomusic" },
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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

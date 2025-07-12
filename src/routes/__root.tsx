import { Outlet, createRootRoute } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

import "@fontsource-variable/inter";
import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createSignal } from "solid-js";
import appCss from "~/global.css?url";
import { MusicContext } from "~/lib/client/music-context";

export const Route = createRootRoute({
  component: () => {
    const [spotify, setSpotify] = createSignal<SpotifyApi>();
    const context = {
      spotify,
      setSpotify,
    };

    return (
      <>
        <MusicContext.Provider value={context}>
          <Outlet />
        </MusicContext.Provider>
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

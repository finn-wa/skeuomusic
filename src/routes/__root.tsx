import { createRootRoute, Outlet } from "@tanstack/solid-router";
import { createSignal, onMount, Show } from "solid-js";
import appCss from "~/global.css?url";
import { AuthContext } from "~/lib/client/auth-context";

import "@fontsource-variable/inter";
import type { SpotifyAuth } from "spotify-api-client";
import { createSpotifyAuth } from "~/lib/client/spotify-auth";

export const Route = createRootRoute({
  context: () => {},
  component: () => {
    const [spotifyAuth, setSpotifyAuth] = createSignal<
      SpotifyAuth | undefined
    >();

    const context: AuthContext = {
      spotifyAuth,
      setSpotifyAuth,
      requiredSpotifyAuth: () => {
        const auth = spotifyAuth();
        if (auth == null) {
          throw new Error("Spotify auth required but not present");
        }
        return auth;
      },
    };

    onMount(() => {
      const initialSpotifyAuth = createSpotifyAuth();
      setSpotifyAuth(initialSpotifyAuth);
    });

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
  errorComponent: (error) => (
    <div style={{ overflow: "auto", margin: "2rem" }}>
      <h2>{`${error.error.name}: ${error.error.message}`}</h2>
      <Show when={error.error.stack != null}>
        <pre>{error.error.stack}</pre>
      </Show>
      <Show when={error.info?.componentStack != null}>
        <h3>Component stack:</h3>
        <p>{error.info!.componentStack}</p>
      </Show>
    </div>
  ),

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

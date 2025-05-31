import { Slot, component$, useContext } from "@builder.io/qwik";
import "@fontsource-variable/inter";
import { Header } from "~/components/header/header";
import { TabBar } from "~/components/tab-bar/tab-bar";
import { SpotifyAuthContext } from "..";

// this bit isn't working... i guess the callback should be this page and not /auth?

/**
 * Watches the sharedMap for the spotify token from auth endpoint.
 * Watches the cookie for cached token values.
 * Updates both to the latest value.
 */

export default component$(() => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  return (
    <div class="page">
      <Header />
      <div class="content">
        {spotifyAuth.token?.access_token ?? "no token"}
        <Slot />
      </div>
      <TabBar />
    </div>
  );
});

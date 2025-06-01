import { Slot, component$, useContext } from "@builder.io/qwik";
import "@fontsource-variable/inter";
import { Header } from "~/components/header/header";
import { NavTabBar } from "~/components/nav-tab-bar/nav-tab-bar";
import { SpotifyAuthContext } from "../layout";

/**
 * Provides header and nav tab bar for /player routes
 */
export default component$(() => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  return (
    <div class="page">
      <Header />
      <div class="content">
        <Slot />
      </div>
      <NavTabBar />
    </div>
  );
});

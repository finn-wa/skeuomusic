import { Outlet, createFileRoute, useNavigate } from "@tanstack/solid-router";
import { onMount, useContext } from "solid-js";
import { MusicContext } from "~/lib/client/music-context";

export const Route = createFileRoute("/music")({
  component: Music,
});

/**
 * Validates context for /music routes. There is probably a more idomatic way
 * to do this.
 * TODO: this should be a layout-only route, prevent navigation to /music
 * or it should just be a guard of some kind
 */
export default function Music() {
  // const navigate = useNavigate();
  // const context = useContext(MusicContext);
  // onMount(() => {
  //   if (context?.spotify() == null) {
  //     // TODO: handle re-auth without redirect
  //     navigate({ to: "/redirect/spotify" });
  //   }
  // });
  return <Outlet />;
}

import { Outlet, createFileRoute } from "@tanstack/solid-router";
import Header from "~/components/header/Header";
import { NavBar } from "~/components/nav-bar/NavBar";

export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/**
 * Provides header and nav tab bar for /music/library routes
 */
export default function MusicLibrary() {
  return (
    <>
      <Header />
      <div class="content-frame">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

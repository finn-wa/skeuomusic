import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header/header";
import NavBar from "@/components/nav-bar/nav-bar";

export const Route = createFileRoute("/music/library")({
  component: MusicLibrary,
});

/** Provides header and nav tab bar for /music/library routes */
function MusicLibrary() {
  return (
    <>
      <Header />
      <div className="content-frame">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

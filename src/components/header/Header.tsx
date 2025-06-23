import { useRouterState } from "@tanstack/solid-router";
import { SKEUOMUSIC } from "~/lib/constants";
import NavArrowButton from "../nav-arrow-button/NavArrowButton";

// https://docs.solidjs.com/solid-start/building-your-application/head-and-metadata
export default function Header() {
  const currentRouteContext = useRouterState({
    select: (state) =>
      (state.matches.at(-1)?.context ?? {}) as { headerTitle?: string },
  });
  const hideLeft = () => false;
  const hideRight = () => true;
  return (
    <header class="bar">
      <div class="header-button left">
        <NavArrowButton direction="left" hide={hideLeft} />
      </div>

      <h1>{currentRouteContext()?.headerTitle ?? SKEUOMUSIC}</h1>

      <div class="header-button right">
        <NavArrowButton direction="right" hide={hideRight} />
      </div>
    </header>
  );
}

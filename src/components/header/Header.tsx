import { useRouterState } from "@tanstack/solid-router";
import { SKEUOMUSIC } from "~/lib/constants";

// https://docs.solidjs.com/solid-start/building-your-application/head-and-metadata
export default function Header() {
  const currentRouteContext = useRouterState({
    select: (state) =>
      (state.matches.at(-1)?.context ?? {}) as { headerTitle?: string },
  });
  return (
    <header class="bar">
      <h1>{currentRouteContext()?.headerTitle ?? SKEUOMUSIC}</h1>
      <div />
    </header>
  );
}

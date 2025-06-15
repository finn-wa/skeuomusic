import { useRouter, useRouterState } from "@tanstack/solid-router";

// https://docs.solidjs.com/solid-start/building-your-application/head-and-metadata
export default function Header() {
  const currentRouteContext = useRouterState({
    select: (state) =>
      (state.matches.at(-1)?.context ?? {}) as { headerTitle?: string },
  });
  return (
    <header class="bar emboss-y">
      <h1>{currentRouteContext()?.headerTitle ?? "skeuomusic"}</h1>
    </header>
  );
}

import { useRouterState } from "@tanstack/solid-router";
import { type Accessor, Show } from "solid-js";
import { SKEUOMUSIC } from "~/lib/constants";
import NavArrowButton from "../nav-arrow-button/NavArrowButton";

export type HeaderRouteContext = {
  title?: string;
  backButton?: { label: string; href?: string };
};

export default function Header() {
  const context = useRouterState({
    select: (state) => {
      const context = state.matches.at(-1)?.context;
      if (context != null && "header" in context) {
        return context.header as HeaderRouteContext;
      }
      return undefined;
    },
  });
  return (
    <HeaderComponent
      title={() => context()?.title}
      backButton={() => context()?.backButton}
    />
  );
}

export type HeaderProps = {
  [K in keyof HeaderRouteContext]-?: Accessor<HeaderRouteContext[K]>;
};

export function HeaderComponent({ title, backButton }: HeaderProps) {
  return (
    <header class="bar">
      <div class="header-button left">
        <Show when={backButton() != null}>
          <NavArrowButton
            direction="left"
            text={() => backButton()?.label}
            href={() => backButton()?.href ?? ".."}
          />
        </Show>
      </div>

      <h1 class="text-truncate">{title() ?? SKEUOMUSIC}</h1>

      <div class="header-button right">
        <NavArrowButton
          direction="right"
          kind="primary"
          text={() => "Now\nPlaying"}
          href={() => "/player"}
        />
      </div>
    </header>
  );
}

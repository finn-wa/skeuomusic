import { useRouterState } from "@tanstack/solid-router";
import { Show } from "solid-js";
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
      title={context()?.title}
      backButton={context()?.backButton}
    />
  );
}

export type HeaderProps = HeaderRouteContext;

export function HeaderComponent(props: HeaderProps) {
  return (
    <header class="bar">
      <div class="header-button left">
        <Show when={props.backButton != null}>
          <NavArrowButton
            direction="left"
            text={props.backButton?.label}
            href={props.backButton?.href ?? ".."}
          />
        </Show>
      </div>

      <h1 class="text-truncate">{props.title ?? SKEUOMUSIC}</h1>

      <div class="header-button right">
        <NavArrowButton
          direction="right"
          kind="primary"
          text={"Now\nPlaying"}
          href={"/player"}
        />
      </div>
    </header>
  );
}

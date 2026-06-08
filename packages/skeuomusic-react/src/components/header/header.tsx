import { useRouterState } from "@tanstack/react-router";
import { SKEUOMUSIC } from "@/shared/constants";
import NavArrowButton from "../nav-arrow-button/nav-arrow-button";

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
  return <HeaderComponent title={context?.title} backButton={context?.backButton} />;
}

export type HeaderProps = HeaderRouteContext;

export function HeaderComponent({ backButton, title = SKEUOMUSIC }: HeaderProps) {
  return (
    <header className="bar">
      <div className="header-button left">
        {backButton != null && (
          <NavArrowButton
            direction="left"
            text={backButton.label}
            href={backButton.href ?? ".."}
          />
        )}
      </div>

      <h1 className="text-truncate">{title}</h1>

      <div className="header-button right">
        <NavArrowButton
          direction="right"
          kind="primary"
          text={"Now\nPlaying"}
          href="/music/player"
        />
      </div>
    </header>
  );
}

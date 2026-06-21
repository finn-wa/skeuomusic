import { useHeaderContext, type HeaderState } from "@/shared/context/header";
import HeaderArrowButton from "../header-arrow-button/header-arrow-button";
import HeaderButton from "../header-button/header-button";

export default function Header() {
  const headerContext = useHeaderContext();
  return (
    <HeaderComponent
      title={headerContext.title}
      leftButton={headerContext.leftButton}
      rightButton={headerContext.rightButton}
    />
  );
}

export type HeaderProps = HeaderState;

export function HeaderComponent({
  leftButton,
  rightButton = { kind: "link", label: "Now\nPlaying", href: "/music/player" },
  title,
}: HeaderProps) {
  return (
    <header className="bar">
      <div className="header-button left">
        {leftButton != null && (
          <HeaderArrowButton
            direction="left"
            text={leftButton.label}
            href={leftButton.href ?? ".."}
          />
        )}
      </div>

      <h1 className="text-truncate">{title}</h1>

      <div className="header-button right">
        {rightButton.kind === "link" ? (
          <HeaderArrowButton
            direction="right"
            kind="primary"
            text={"Now\nPlaying"}
            href="/music/player"
          />
        ) : (
          <HeaderButton
            type={rightButton.kind}
            text={rightButton.label}
            disabled={rightButton.disabled}
            form={rightButton.formId}
            onClick={rightButton.onClick}
          />
        )}
      </div>
    </header>
  );
}

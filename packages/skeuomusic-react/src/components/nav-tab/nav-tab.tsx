import { INITIAL_SCROLL_ID } from "@/shared/constants";
import { Link } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";

export type TabButtonProps = PropsWithChildren<{
  route: string;
  label: string;
}>;

export default function NavTab({ route, label, children }: TabButtonProps) {
  return (
    <Link
      to={route}
      className="tab"
      activeProps={{ className: "selected" }}
      hash={INITIAL_SCROLL_ID}
    >
      <div className="tab-border">
        {children}
        <small>{label}</small>
      </div>
    </Link>
  );
}

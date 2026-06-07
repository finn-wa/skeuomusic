import { INITIAL_SCROLL_ID } from "@/shared/constants";
import { Link } from "@tanstack/react-router";
import { useState, type PropsWithChildren } from "react";

export type TabButtonProps = PropsWithChildren<{
  route: string;
  label: string;
}>;

export default function NavTab({ route, label, children }: TabButtonProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <Link
      to={route}
      className="tab"
      activeProps={{ className: "selected", "aria-current": "page" }}
      hash={clicked ? undefined : INITIAL_SCROLL_ID}
      onClick={() => setTimeout(() => setClicked(true), 0)}
    >
      <div className="tab-border">
        {children}
        <small>{label}</small>
      </div>
    </Link>
  );
}

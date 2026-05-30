import type React from "react";

export function MockLink({
  to,
  hash,
  className,
  children,
}: {
  to: string;
  hash?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={hash ? `${to}#${hash}` : to} className={className}>
      {children}
    </a>
  );
}

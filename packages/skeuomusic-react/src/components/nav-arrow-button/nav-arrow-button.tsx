import { estimateTextWidth } from "@/shared/font-width";
import { urlForId } from "@/shared/svg-utils";
import { Link, useLocation } from "@tanstack/react-router";
import { useId, useLayoutEffect, useRef, useState } from "react";

export type NavArrowButtonProps = {
  text?: string;
  href: string;
  direction: "left" | "right";
  kind?: "primary" | "secondary" | "player";
  hide?: boolean;
};

export default function NavArrowButton({
  text,
  href,
  direction,
  kind = "secondary",
  hide = false,
}: NavArrowButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(() =>
    estimateTextWidth("interVariable16px700w", text ?? ""),
  );
  const currentLocation = useLocation({ select: (state) => state.href });
  const id = useId();
  const arrowId = `arrow-${id}`;
  const clipId = `clip-${id}`;
  const bgId = `bg-${id}`;
  const shadowId = `shadow-${id}`;

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.clientWidth);
    }
  }, [text]);

  // TODO : Now Playing text is a bit smaller and it has a line break
  // perhaps support using child prop for text via foreignObject
  if (hide || text == null || href == null) {
    return <></>;
  }
  const svgPadding = Math.min(Math.max(textWidth, 16), 175);
  const width = svgPadding + 24;
  return (
    <Link
      to={href}
      from={currentLocation as any}
      className={`nav-arrow ${direction} ${kind} text-truncate`}
      data-testid={`nav-arrow-${direction}`}
    >
      <span ref={textRef} className="nav-arrow-text text-truncate">
        {text}
      </span>
      <svg
        width={`${width}px`}
        height="40px"
        viewBox={`-1 -1 ${width + 1} 41`}
        preserveAspectRatio="xMinYMid meet"
      >
        <title>Arrow</title>
        <defs>
          <path
            id={arrowId}
            d={`m0 20 13.2-17.6a6 6 153.43 0 1 4.8-2.4h${svgPadding}a6 6 45 0 1 6 6v28a6 6 135 0 1-6 6h-${svgPadding}a6 6 26.565 0 1-4.8-2.4z`}
            transform={
              direction === "left" ? undefined : `translate(${width}) scale(-1, 1)`
            }
          />
          <linearGradient
            id={bgId}
            x1="0"
            x2="0"
            y1="0"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--header-btn-gradient-top)" offset="0" />
            <stop stopColor="var(--header-btn-gradient-bottom)" offset="1" />
          </linearGradient>
          <filter id={shadowId} colorInterpolationFilters="sRGB">
            <feOffset dx="0" dy="0.25" />
            <feGaussianBlur result="blur" stdDeviation="0.8" />
            <feFlood
              // TODO: Implement inner glow/shadow for player button
              floodColor={kind === "player" ? "white" : "black"}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite"
            />
            <feBlend in="blur" in2="composite" />
          </filter>
          <clipPath id={clipId}>
            <use href={`#${arrowId}`} />
          </clipPath>
        </defs>
        <use
          href={`#${arrowId}`}
          clipPath={urlForId(clipId)}
          fill={urlForId(bgId)}
          filter={urlForId(shadowId)}
        />
      </svg>
    </Link>
  );
}

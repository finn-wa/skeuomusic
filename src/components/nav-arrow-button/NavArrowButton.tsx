import { Link } from "@tanstack/solid-router";
import {
  type Accessor,
  Show,
  createSignal,
  createUniqueId,
  onMount,
} from "solid-js";
import { estimateTextWidth } from "~/lib/client/font-width";

export type NavArrowButtonProps = {
  text: Accessor<string | undefined>;
  href: Accessor<string | undefined>;
  direction: "left" | "right";
  hide?: Accessor<boolean>;
};

export default function NavArrowButton({
  text,
  href,
  direction,
  hide = () => false,
}: NavArrowButtonProps) {
  const [mounted, setMounted] = createSignal<boolean>(false);
  onMount(() => setMounted(true));

  let textElement!: HTMLSpanElement;
  const textWidth = () => {
    const textContent = text();
    if (textContent == null) {
      return 0;
    }
    if (mounted() && textElement?.clientWidth) {
      return textElement.clientWidth;
    }
    return estimateTextWidth("interVariable16px700w", textContent);
  };
  const minTextWidth = 16;
  const maxTextWidth = 175;
  const svgPadding = () => {
    const cappedMax = Math.max(textWidth(), minTextWidth);
    const cappedMin = Math.min(cappedMax, maxTextWidth);
    return cappedMin;
  };
  const width = () => svgPadding() + 24;

  const id = createUniqueId();
  const arrowId = `arrow-${id}`;
  const clipId = `clip-${id}`;
  const bgId = `bg-${id}`;
  const shadowId = `shadow-${id}`;
  return (
    <Show when={!hide() && text() != null && href() != null}>
      <Link to={href()} class={`nav-arrow ${direction} text-truncate`}>
        <span ref={textElement} class="nav-arrow-text text-truncate">
          {text()}
        </span>
        <svg
          width={`${width()}px`}
          height="40px"
          viewBox={`-1 -1 ${width() + 1} 41`}
          preserveAspectRatio="xMinYMid meet"
        >
          <title>Arrow</title>
          <defs>
            <path
              id={arrowId}
              d={`m0 20 13.2-17.6a6 6 153.43 0 1 4.8-2.4h${svgPadding()}a6 6 45 0 1 6 6v28a6 6 135 0 1-6 6h-${svgPadding()}a6 6 26.565 0 1-4.8-2.4z`}
              transform={
                direction === "left"
                  ? undefined
                  : `translate(${width()}) scale(-1, 1)`
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
              <stop stop-color="#e8e8e8" offset="0" />
              <stop stop-color="#d3d3d3" offset="1" />
            </linearGradient>
            <filter id={shadowId} color-interpolation-filters="sRGB">
              <feOffset dx="0" dy="0.25" />
              <feGaussianBlur result="blur" stdDeviation="0.8" />
              <feFlood flood-color="rgb(0,0,0)" result="flood" />
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
            clip-path={`url(#${clipId})`}
            fill={`url(#${bgId})`}
            filter={`url(#${shadowId})`}
          />
        </svg>
      </Link>
    </Show>
  );
}

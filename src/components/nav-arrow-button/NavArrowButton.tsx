import { type Accessor, createSignal, onMount } from "solid-js";

export type NavArrowButtonProps = {
  text?: Accessor<string>;
  direction: "left" | "right";
  hide?: Accessor<boolean>;
};

export default function NavArrowButton({
  text = () => "Artists",
  direction,
  hide = () => false,
}: NavArrowButtonProps) {
  let textElement!: HTMLSpanElement;
  const minTextWidth = 48;
  const [textWidth, setTextWidth] = createSignal<number>(minTextWidth);
  const svgPadding = () => Math.max(0, textWidth() - minTextWidth);
  const [loading, setLoading] = createSignal<boolean>(true);

  onMount(() => {
    const bb = textElement.getBoundingClientRect();
    console.log(bb.width);
    setTextWidth(bb.width);
    setLoading(false);
  });

  return (
    <button
      type="button"
      class="nav-arrow"
      style={{ visibility: loading() || hide() ? "hidden" : "visible" }}
    >
      <span ref={textElement} class="nav-arrow-text text-truncate">
        {text()}
      </span>
      <svg
        width={`${80 + svgPadding()}px`}
        height="40px"
        viewBox={`-1 -1 ${81 + svgPadding()} 41`}
        preserveAspectRatio="xMinYMid meet"
      >
        <title>Arrow</title>
        <defs>
          <path
            id="arrow"
            d={`m0 20 13.2-17.6a6 6 153.43 0 1 4.8-2.4h${56 + svgPadding()}a6 6 45 0 1 6 6v28a6 6 135 0 1-6 6h-${56 + svgPadding()}a6 6 26.565 0 1-4.8-2.4z`}
          />
          <linearGradient
            id="bg"
            x1="0"
            x2="0"
            y1="0"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#e8e8e8" offset="0" />
            <stop stop-color="#d3d3d3" offset="1" />
          </linearGradient>
          <filter id="shadow" color-interpolation-filters="sRGB">
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
          <clipPath id="clip-arrow">
            <use href="#arrow" />
          </clipPath>
        </defs>
        <use
          href="#arrow"
          clip-path="url(#clip-arrow)"
          fill="url(#bg)"
          filter="url(#shadow)"
        />
      </svg>
    </button>
  );
}

import { PlayerIconGradient } from "~/components/icons/IconDefs";
import {
  getIconDefIds,
  hrefForId,
  urlForId,
  viewBox,
} from "~/lib/client/svg-utils";

export function ShuffleIcon(props: { height: string; shuffle: boolean }) {
  const ids = {
    ...getIconDefIds("shuffle"),
    arrow1: "shuffle-icon-arrow-1",
    arrow2: "shuffle-icon-arrow-2",
    arrow3: "shuffle-icon-arrow-3",
    clipId: "shuffle-icon-clip",
  };
  const urls = {
    shadowUrl: urlForId(ids.shadow),
    gradientUrl: urlForId(ids.gradient),
    arrow1Href: hrefForId(ids.arrow1),
    arrow2Href: hrefForId(ids.arrow2),
    arrow3Href: hrefForId(ids.arrow3),
    clipUrl: urlForId(ids.clipId),
  };

  return (
    <svg viewBox={viewBox(40, 39)} height={props.height}>
      <title>Shuffle</title>
      <defs>
        <PlayerIconGradient id={ids.gradient} />

        <path
          id={ids.arrow1}
          d="m30 2v4h-5c-1 0-1.4 0.3-1.7 0.5-0.2 0.1-0.4 0.3-0.6 0.4-0.3 0.3-0.5 0.5-0.7 0.8-0.5 0.5-1.1 1.2-1.7 1.9-1.2 1.6-2.7 3.6-4.2 5.6s-3 4-4.2 5.4c-0.4 0.6-0.8 1-1.1 1.4h-8.8v6h10c1.1 0 1.4-0.3 1.7-0.5s0.4-0.3 0.6-0.4c0.3-0.3 0.5-0.5 0.7-0.8 0.5-0.5 1-1.2 1.6-1.9 1.3-1.6 2.8-3.6 4.3-5.6s3-4 4.1-5.4c0.5-0.6 0.9-1 1.2-1.4h3.8v4l8-7z"
          transform="translate(0, 3)"
        />
        <path
          id={ids.arrow2}
          d="m30 18v4h-1.5c-0.97 0-1.9-0.32-2.7-0.9l-2-1.5-3.6 4.8 2 1.5c1.7 1.3 3.7 2 5.8 2.1v0.021h2v4l8-7z"
          transform="translate(0, 3)"
        />
        <path
          id={ids.arrow3}
          d="m2 6v6h8l3.2 2.4 3.6-4.8-4-3a3 3 0 0 0-1.8-0.6z"
          transform="translate(0, 3)"
        />

        <clipPath id={ids.clipId}>
          <use href={urls.arrow1Href} />
          <use href={urls.arrow2Href} />
          <use href={urls.arrow3Href} />
        </clipPath>

        <filter id={ids.shadow} height="150%" width="150%" x="-25%" y="-25%">
          <feDropShadow
            dx="0"
            dy="-1"
            stdDeviation=".1"
            flood-color="black"
            flood-opacity="0.5"
          />
        </filter>
      </defs>

      <g filter={urls.shadowUrl} fill="black">
        <use href={urls.arrow1Href} />
        <use href={urls.arrow2Href} />
        <use href={urls.arrow3Href} />{" "}
      </g>
      <rect
        width="40"
        height="39"
        fill={urls.gradientUrl}
        clip-path={urls.clipUrl}
      />
    </svg>
  );
}

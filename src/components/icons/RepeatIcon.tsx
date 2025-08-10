import { PlayerIconGradient } from "~/components/icons/IconDefs";
import {
  getIconDefIds,
  hrefForId,
  urlForId,
  viewBox,
} from "~/lib/client/svg-utils";
import type { Repeat } from "~/lib/player/player-store";

export function RepeatIcon(props: { height: string; state: Repeat }) {
  const ids = {
    ...getIconDefIds("repeat"),
    arrowId: "repeat-icon-arrow",
    clipId: "repeat-icon-clip",
  };
  const urls = {
    shadowUrl: urlForId(ids.shadow),
    gradientUrl: urlForId(ids.gradient),
    arrowHref: hrefForId(ids.arrowId),
    clipUrl: urlForId(ids.clipId),
  };

  return (
    <svg viewBox={viewBox(40, 40)} height={props.height}>
      <title>Repeat</title>
      <defs>
        <PlayerIconGradient id={ids.gradient} />
        <path
          id={ids.arrowId}
          d="M 27,4 V 9 H 19 13 12 C 6.51,9 2,13.51 2,19 v 7 l 6,-6 v -1 c 0,-2.24 1.76,-4 4,-4 h 1 6 8 v 5 l 8,-8 z"
        />
        <clipPath id={ids.clipId}>
          <use href={urls.arrowHref} />
          <use
            href={urls.arrowHref}
            transform="translate(40,42) scale(-1,-1)"
          />
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
        <use href={urls.arrowHref} />
        <use href={urls.arrowHref} transform="translate(40,42) scale(-1,-1)" />
      </g>

      <rect
        width="40"
        height="40"
        fill={urls.gradientUrl}
        clip-path={urls.clipUrl}
      />
    </svg>
  );
}

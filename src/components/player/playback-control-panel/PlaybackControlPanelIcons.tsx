import { Show } from "solid-js";
import { urlForId } from "~/lib/client/svg-utils";

const svgHeight = "45%";
const viewBox = (width: number) => `0 0 ${width} 39`;

type IconDefIds = {
  gradientId: string;
  shadowId: string;
};

function getIconDefIds(idPrefix: string): IconDefIds {
  return {
    gradientId: `${idPrefix}-icon-gradient`,
    shadowId: `${idPrefix}-icon-shadow`,
  };
}

function IconDefs(props: { ids: IconDefIds }) {
  return (
    <defs>
      <linearGradient id={props.ids.gradientId} x1="0" x2="0" y1="0" y2="1">
        <stop stop-color="var(--player-icon-gradient-top)" offset="0.2" />
        <stop stop-color="var(--player-icon-gradient-bottom)" offset="1" />
      </linearGradient>
      <filter id={props.ids.shadowId}>
        <feOffset dx="0" dy="-2" result="offset" />
        <feFlood flood-color="black" flood-opacity="0.95" />
        <feComposite
          in="color"
          in2="offset"
          operator="in"
          result={props.ids.shadowId}
        />
        <feMerge>
          <feMergeNode in={props.ids.shadowId} />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function getIconDefUrls(ids: IconDefIds) {
  return {
    fill: urlForId(ids.gradientId),
    filter: urlForId(ids.shadowId),
  };
}

export function PlaybackControlPanelPlayPause(props: { playing: boolean }) {
  const ids = getIconDefIds("play");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={svgHeight} viewBox={viewBox(41)}>
      <title>{props.playing ? "Pause" : "Play"}</title>
      <IconDefs ids={ids} />
      <Show
        when={props.playing}
        fallback={<polygon points="0,2 41,19.5 0,37" {...defUrls} />}
      >
        <rect x="5" y="2" width="10" height="35" {...defUrls} />
        <rect x="26" y="2" width="10" height="35" {...defUrls} />
      </Show>
    </svg>
  );
}

const smallTriangle = "0,6 24,19.5 0,34";

export function PlaybackControlPanelNext() {
  const ids = getIconDefIds("next");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={svgHeight} viewBox={viewBox(50)}>
      <title>{"Next"}</title>
      <IconDefs ids={ids} />
      <polygon points={smallTriangle} {...defUrls} />
      <polygon points={smallTriangle} transform="translate(24)" {...defUrls} />
    </svg>
  );
}

export function PlaybackControlPanelPrev() {
  const ids = getIconDefIds("prev");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={svgHeight} viewBox={viewBox(50)}>
      <title>{"Next"}</title>
      <IconDefs ids={ids} />
      <g transform="translate(50) scale(-1, 1)">
        <polygon points={smallTriangle} {...defUrls} />
        <polygon
          points={smallTriangle}
          transform="translate(24)"
          {...defUrls}
        />
      </g>
    </svg>
  );
}

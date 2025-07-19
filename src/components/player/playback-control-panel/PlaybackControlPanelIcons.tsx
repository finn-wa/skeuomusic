import { urlForId } from "~/lib/client/svg-utils";

const svgHeight = "40%";
const viewBox = (width: number) => `0 0 ${width} 50`;

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
        <stop stop-color="#e0dfdf" offset="0.2" />
        <stop stop-color="#969696" offset="1" />
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

export function PlaybackControlPanelPause() {
  const ids = getIconDefIds("pause");
  const { fill, filter } = getIconDefUrls(ids);
  return (
    <svg height={svgHeight} viewBox={viewBox(40)}>
      <title>Pause</title>
      <IconDefs ids={ids} />
      <g>
        <rect x="0" y="2" width="13" height="46" fill={fill} filter={filter} />
        <rect x="27" y="2" width="13" height="46" fill={fill} filter={filter} />
      </g>
    </svg>
  );
}

export function PlaybackControlPanelPlay() {
  const ids = getIconDefIds("play");
  const { fill, filter } = getIconDefUrls(ids);
  return (
    <svg height={svgHeight} viewBox={viewBox(55)}>
      <title>Play</title>
      <IconDefs ids={ids} />
      <polygon points="0,2 55,24 0,48" fill={fill} filter={filter} />
    </svg>
  );
}

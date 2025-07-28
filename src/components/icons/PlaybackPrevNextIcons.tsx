import { getIconDefIds, viewBox } from "~/lib/client/svg-utils";
import { getIconDefUrls } from "~/lib/client/svg-utils";
import { PlaybackControlPanelIconDefs } from "./IconDefs";

const smallTriangle = "0,6 24,19.5 0,34";

export function PlaybackNextIcon(props: { height: string }) {
  const ids = getIconDefIds("next");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={props.height} viewBox={viewBox(50)}>
      <title>{"Next"}</title>
      <PlaybackControlPanelIconDefs ids={ids} />
      <polygon points={smallTriangle} {...defUrls} />
      <polygon points={smallTriangle} transform="translate(24)" {...defUrls} />
    </svg>
  );
}

export function PlaybackPrevIcon(props: { height: string }) {
  const ids = getIconDefIds("prev");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={props.height} viewBox={viewBox(50)}>
      <title>{"Next"}</title>
      <PlaybackControlPanelIconDefs ids={ids} />
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

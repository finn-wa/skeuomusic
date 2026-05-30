import { getIconDefIds, getIconDefUrls, viewBox } from "@/shared/svg-utils";
import { PlaybackControlPanelIconDefs } from "./icon-defs";

export function PlayPauseIcon({ height, playing }: { height: string; playing: boolean }) {
  const ids = getIconDefIds("play");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={height} viewBox={viewBox(41)}>
      <title>{playing ? "Pause" : "Play"}</title>
      <PlaybackControlPanelIconDefs ids={ids} />
      {playing ? (
        <>
          <rect x="5" y="2" width="10" height="35" {...defUrls} />
          <rect x="26" y="2" width="10" height="35" {...defUrls} />
        </>
      ) : (
        <polygon points="0,2 41,19.5 0,37" {...defUrls} />
      )}
    </svg>
  );
}

import { Show } from "solid-js";
import { getIconDefIds, getIconDefUrls, viewBox } from "~/lib/client/svg-utils";
import { PlaybackControlPanelIconDefs } from "./IconDefs";

export function PlayPauseIcon(props: { height: string; playing: boolean }) {
  const ids = getIconDefIds("play");
  const defUrls = getIconDefUrls(ids);
  return (
    <svg height={props.height} viewBox={viewBox(41)}>
      <title>{props.playing ? "Pause" : "Play"}</title>
      <PlaybackControlPanelIconDefs ids={ids} />
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

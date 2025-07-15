import { Show } from "solid-js";

export type PlaybackControlOverlayProps = {
  show: boolean;
};

export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  return (
    <Show when={props.show}>
      <div class="panel">PlaybackControlOverlay</div>
    </Show>
  );
}

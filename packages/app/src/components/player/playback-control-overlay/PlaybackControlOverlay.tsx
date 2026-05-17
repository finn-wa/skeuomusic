import { useMusicContext } from "~/lib/client/music-context";
import PlaybackTimeline from "../playback-timeline/PlaybackTimeline";
import { RepeatButton } from "./RepeatButton";
import { ShuffleButton } from "./ShuffleButton";

export type PlaybackControlOverlayProps = {
  show: boolean;
};

export function PlaybackControlOverlay(props: PlaybackControlOverlayProps) {
  const { state } = useMusicContext().playerStore;
  return (
    <div
      class="playback-controls-outline"
      style={{ opacity: props.show ? 1 : 0 }}
    >
      <div class="playback-controls-bg">
        <span class="h4 playback-track-number">
          {`${state.track?.current ?? 0} of ${state.track?.total ?? 0}`}
        </span>
        <div class="playback-controls">
          <RepeatButton />
          <PlaybackTimeline />
          <ShuffleButton />
        </div>
      </div>
    </div>
  );
}

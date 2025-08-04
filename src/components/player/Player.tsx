import { createSignal } from "solid-js";
import placeholderArt from "~/assets/channel-orange-mockup.png";
import { usePlayerContext } from "~/lib/player/player-context";
import { AlbumArt } from "../album-art/AlbumArt";
import { PlaybackControlOverlay } from "./playback-control-overlay/PlaybackControlOverlay";
import { PlaybackControlPanel } from "./playback-control-panel/PlaybackControlPanel";
import { PlayerHeader } from "./player-header/PlayerHeader";
import { VolumeControlPanel } from "./volume-control-panel/VolumeControlPanel";

export function Player() {
  const { state, actions } = usePlayerContext();
  /**
   * TODO: album art needs to stop growing in width when it
   * starts to push the controls off the page.
   *
   * art size:
   * - grows to fit the smallest of width and height
   * - does not cause parent container to grow large and push
   *    panels off-screen
   * - ideally does not expand past max res
   * - is centered in art-container vertically and horizontally
   *
   * buttons in panel:
   * - full width
   * - but not ultra-stretched, perhaps a fixed max width
   */
  const [isOverlayShown, setOverlayShown] = createSignal(true);

  function toggleOverlay() {
    setOverlayShown(!isOverlayShown());
  }
  return (
    <div class="player-container">
      <PlayerHeader onInfoClick={toggleOverlay} />
      <div class="content-frame">
        <div class="art-container">
          <PlaybackControlOverlay
            show={isOverlayShown()}
            currentTrack={1}
            totalTracks={17}
          />
          <AlbumArt
            name="Channel Orange"
            srcset={[{ url: placeholderArt, width: 1280 }]}
            reflectionClass="player-reflection"
          />
        </div>
        <PlaybackControlPanel />
        <VolumeControlPanel />
      </div>
    </div>
  );
}

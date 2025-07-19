import { createFileRoute } from "@tanstack/solid-router";
import placeholderArt from "~/assets/channel-orange-mockup.png";
import { AlbumArt } from "~/components/album-art/AlbumArt";
import { PlaybackControlOverlay } from "~/components/player/PlaybackControlOverlay";
import { PlayerHeader } from "~/components/player/PlayerHeader";
import { PlaybackControlPanel } from "~/components/player/playback-control-panel/PlaybackControlPanel";
import { VolumeControlPanel } from "~/components/player/volume-control-panel/VolumeControlPanel";

export const Route = createFileRoute("/music/player/")({
  component: Player,
});

function Player() {
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
  return (
    <div class="player-container">
      <PlayerHeader />
      <div class="content-frame">
        <div class="art-container">
          <PlaybackControlOverlay show={false} />
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

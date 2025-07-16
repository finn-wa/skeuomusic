import { createFileRoute } from "@tanstack/solid-router";
import { PlaybackControlOverlay } from "~/components/player/PlaybackControlOverlay";
import { PlayerAlbumArt } from "~/components/player/PlayerAlbumArt";
import { PlayerHeader } from "~/components/player/PlayerHeader";
import { VolumeControlPanel } from "~/components/player/VolumeControlPanel";
import { PlaybackControlPanel } from "~/components/player/playback-control-panel/PlaybackControlPanel";

export const Route = createFileRoute("/music/player/")({
  component: Player,
});

function Player() {
  return (
    <div class="player-container">
      <PlayerHeader />
      <div class="player-background content-frame">
        <PlaybackControlOverlay show={false} />
        <PlayerAlbumArt />
      </div>
      <PlaybackControlPanel />
      <VolumeControlPanel />
    </div>
  );
}

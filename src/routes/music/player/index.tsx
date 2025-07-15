import { createFileRoute } from "@tanstack/solid-router";
import { PlaybackControlOverlay } from "~/components/player/PlaybackControlOverlay";
import { PlaybackControlPanel } from "~/components/player/PlaybackControlPanel";
import { PlayerAlbumArt } from "~/components/player/PlayerAlbumArt";
import { PlayerHeader } from "~/components/player/PlayerHeader";
import { VolumeControlPanel } from "~/components/player/VolumeControlPanel";

export const Route = createFileRoute("/music/player/")({
  component: Player,
});

function Player() {
  return (
    <>
      <PlayerHeader />
      <div class="player-background content-frame">
        <PlaybackControlOverlay show={false} />
        <PlayerAlbumArt />
      </div>
      <PlaybackControlPanel />
      <VolumeControlPanel />
    </>
  );
}

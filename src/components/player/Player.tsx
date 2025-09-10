import { createSignal } from "solid-js";
import { usePlayerContext } from "~/lib/player/player-context";
import { AlbumArt } from "../album-art/AlbumArt";
import { PlaybackControlOverlay } from "./playback-control-overlay/PlaybackControlOverlay";
import { PlaybackControlPanel } from "./playback-control-panel/PlaybackControlPanel";
import { PlayerHeader } from "./player-header/PlayerHeader";
import { VolumeControlPanel } from "./volume-control-panel/VolumeControlPanel";

export function Player() {
  const { state } = usePlayerContext();
  const [isOverlayShown, setOverlayShown] = createSignal(true);

  return (
    <div class="player-container">
      <PlayerHeader
        song={state.song}
        onInfoClick={() => setOverlayShown(!isOverlayShown())}
      />
      <div class="content-frame">
        <div class="art-container">
          <PlaybackControlOverlay show={isOverlayShown()} />
          <AlbumArt
            name={state.song?.album.name ?? "None"}
            srcset={state.song?.album.images ?? []}
            reflectionClass="player-reflection"
          />
        </div>
        <PlaybackControlPanel />
        <VolumeControlPanel />
      </div>
    </div>
  );
}

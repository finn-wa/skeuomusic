import { createSignal, onMount } from "solid-js";
import { useMusicContext } from "~/lib/client/music-context";
import { AlbumArt } from "../album-art/AlbumArt";
import { PlaybackControlOverlay } from "./playback-control-overlay/PlaybackControlOverlay";
import { PlaybackControlPanel } from "./playback-control-panel/PlaybackControlPanel";
import { PlayerHeader } from "./player-header/PlayerHeader";
import { VolumeControlPanel } from "./volume-control-panel/VolumeControlPanel";

export function Player() {
  const musicContext = useMusicContext();
  const { state, dispatch, action } = musicContext.playerStore;
  const [isOverlayShown, setOverlayShown] = createSignal(true);

  onMount(async () => {
    if (
      state.device.kind === "none" ||
      (state.device.id == null && !state.device.local)
    ) {
      dispatch(action.setDevice({ kind: "spotify", local: true }));
    }
  });

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

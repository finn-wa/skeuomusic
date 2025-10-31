import { createSignal, onMount } from "solid-js";
import { initSpotifyPlayer } from "spotify-api-client";
import { useAuthContext } from "~/lib/client/auth-context";
import { usePlayerContext } from "~/lib/player/player-context";
import { AlbumArt } from "../album-art/AlbumArt";
import { PlaybackControlOverlay } from "./playback-control-overlay/PlaybackControlOverlay";
import { PlaybackControlPanel } from "./playback-control-panel/PlaybackControlPanel";
import { PlayerHeader } from "./player-header/PlayerHeader";
import { VolumeControlPanel } from "./volume-control-panel/VolumeControlPanel";

export function Player() {
  const { state } = usePlayerContext();
  const auth = useAuthContext();
  const [isOverlayShown, setOverlayShown] = createSignal(true);

  onMount(async () => {
    const SpotifyPlayer = initSpotifyPlayer(window);
    const player = new SpotifyPlayer({
      name: "skeuomusic",
      getOAuthToken: (callback) => {
        auth
          .spotifyAuth()!
          .getAccessToken()
          .then((token) => {
            callback(token!.access_token);
          });
      },
      enableMediaSession: true,
      volume: 1,
    });
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    const res = await player.connect();
    console.log({ connected: res });
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

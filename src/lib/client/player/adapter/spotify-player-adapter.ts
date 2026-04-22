import {
  type CurrentlyPlayingContextObject,
  initSpotifyPlayer,
  type PlayerApi,
  type TrackObject,
  type WebPlaybackInstance,
  type WebPlaybackState,
} from "spotify-api-client";
import { AnthemEvents } from "spotify-api-client/src/player/enums/Events";
import type { AuthContext } from "../../auth-context";
import type { MusicContext, SpotifyContext } from "../../music-context";
import { getCurrentTrackTime } from "../../music-utils";
import {
  type PlayerActionListener,
  playerActionHandler,
} from "../store/player-action-listeners";
import type { PlayerAction } from "../store/player-actions";
import type {
  PlaybackDevice,
  PlayerState,
  Repeat,
} from "../store/player-state";
import type { PlayerStore } from "../store/player-store";

export async function getSpotifyPlayerState(
  playerApi: PlayerApi,
): Promise<
  { success: true; state: PlayerState } | { success: false; error: unknown }
> {
  let spotifyState: CurrentlyPlayingContextObject | null | undefined;
  try {
    spotifyState = await playerApi.getInformationAboutTheUsersCurrentPlayback();
  } catch (error) {
    return { success: false, error };
  }
  if (spotifyState == null || spotifyState.currently_playing_type !== "track") {
    return {
      success: true,
      state: {
        playing: false,
        repeat: "off",
        shuffle: false,
        volume: 50,
        device: { kind: "none" },
      },
    };
  }
  const currentTrack = spotifyState.item as TrackObject;
  const song: PlayerState["song"] = {
    id: currentTrack.id!,
    uri: currentTrack.uri!,
    durationMs: currentTrack.duration_ms!,
    name: currentTrack.name!,
    album: currentTrack.album!,
    artists:
      currentTrack.artists == null
        ? []
        : currentTrack.artists.filter(
            (artist): artist is { name: string } => artist.name != null,
          ),
  };
  const state: PlayerState = {
    playedAt: { epochMs: Date.now(), trackMs: spotifyState.progress_ms ?? 0 },
    playing: spotifyState.is_playing ?? false,
    repeat: spotifyState.repeat_state as Repeat,
    shuffle: spotifyState.shuffle_state ?? false,
    song,
    track: {
      current: currentTrack.track_number ?? 0,
      total: currentTrack.album?.total_tracks ?? 0,
    },
    volume: spotifyState.device?.volume_percent ?? 50,
    device: {
      kind: "spotify",
      id: spotifyState.device?.id ?? undefined,
      local: false,
    },
  };
  return { success: true, state };
}

export function createSpotifyPlayerAdapter(
  authContext: AuthContext,
  musicContext: MusicContext,
): PlayerActionListener {
  const adapter = new SpotifyPlayerAdapter(
    authContext,
    musicContext.spotify,
    musicContext.playerStore,
  );
  return (action) => adapter.applyAction(action);
}

class SpotifyPlayerAdapter {
  private readonly apiActionHandler = playerActionHandler("Spotify API", {
    play: () => this.playerApi().startAUsersPlayback(),
    pause: () => this.playerApi().pauseAUsersPlayback(),
    setSong: (action) => {
      if (action.song == null) {
        if (this.store.state.playing) {
          this.store.dispatch(this.store.action.pause());
        }
        return;
      }
      return this.playerApi().startAUsersPlayback({
        startAUsersPlaybackRequest: { uris: [action.song.uri] },
      });
    },
    setVolume: ({ volume }) => {
      return this.playerApi().setVolumeForUsersPlayback({
        volumePercent: volume,
      });
    },
    seek: ({ positionMs }) => {
      return this.playerApi().seekToPositionInCurrentlyPlayingTrack({
        positionMs,
      });
    },
    next: () => {
      return this.playerApi().skipUsersPlaybackToNextTrack();
    },
    previous: () => {
      return this.playerApi().skipUsersPlaybackToPreviousTrack();
    },
    setRepeat: ({ repeat }) => {
      return this.playerApi().setRepeatModeOnUsersPlayback({ state: repeat });
    },
    setShuffle: ({ shuffle }) => {
      return this.playerApi().toggleShuffleForUsersPlayback({ state: shuffle });
    },
    setDevice: ({ device }) => this.setDevice(device),
    requestSync: async () => {
      const res = await getSpotifyPlayerState(this.playerApi());
      if (res.success) {
        this.patchStoreState(res.state);
      } else {
        console.error("Failed to get Spotify state", res.error);
      }
    },
    syncExternalState: () => {},
  });

  private readonly webPlayerActionHandler = playerActionHandler(
    "Spotify Web Player",
    {
      play: () => {
        return this.requiredWebPlayer().togglePlay();
      },
      pause: async () => {
        return this.requiredWebPlayer().togglePlay();
      },
      setVolume: ({ volume }) => {
        return this.requiredWebPlayer().setVolume(1.0 / volume);
      },
      seek: ({ positionMs }) => {
        return this.requiredWebPlayer().seek(positionMs);
      },
      next: () => {
        return this.requiredWebPlayer().nextTrack();
      },
      previous: () => {
        return this.requiredWebPlayer().previousTrack();
      },
      requestSync: async () => {
        const webPlayer = this.requiredWebPlayer();
        const state = await webPlayer.getCurrentState();
        if (state == null) {
          console.error("Web player is not connected, cannot get state");
          return;
        }
        this.patchStoreState(this.webPlayerStateToStoreState(state));
      },
      setDevice: ({ device }) => this.setDevice(device),
      syncExternalState: () => {},
      setRepeat: (action) => this.apiActionHandler.setRepeat(action),
      setShuffle: (action) => this.apiActionHandler.setShuffle(action),
      setSong: (action) => this.apiActionHandler.setSong(action),
    },
  );

  constructor(
    private readonly auth: AuthContext,
    private readonly spotify: SpotifyContext,
    private readonly store: PlayerStore,
  ) {}

  applyAction(action: PlayerAction) {
    const device = this.store.state.device;
    if (device.kind !== "spotify") {
      return;
    }
    if (device.local && device.id != null) {
      this.webPlayerActionHandler.applyAction(action);
    } else {
      this.apiActionHandler.applyAction(action);
    }
  }

  private async setDevice(device: PlaybackDevice) {
    if (device.kind !== "spotify") {
      return this.disconnectFromSpotify();
    }
    if (device.id == null) {
      if (device.local) {
        await this.initWebPlayer();
      }
      return this.disconnectFromSpotify();
    }
    await this.playerApi().transferAUsersPlayback({
      transferAUsersPlaybackRequest: {
        device_ids: [device.id],
      },
    });
  }
  private patchStoreState(newState: Partial<PlayerState>) {
    this.store.dispatch(this.store.action.syncExternalState(newState));
  }

  private async disconnectFromSpotify() {
    await this.disconnectWebPlayer();
    await this.playerApi()
      .pauseAUsersPlayback()
      .catch(() => {
        /* Device may already be disconnected */
      });
  }

  private get playerApi() {
    return this.spotify.api.player;
  }

  private requiredWebPlayer() {
    const webPlayer = this.spotify.webPlayer();
    if (webPlayer == null) {
      throw new Error("Web player instance is not defined");
    }
    return webPlayer;
  }

  private async initWebPlayer() {
    let webPlayer = this.spotify.webPlayer();
    if (webPlayer == null) {
      const SpotifyPlayer = initSpotifyPlayer(window);
      webPlayer = new SpotifyPlayer({
        name: "skeuomusic",
        getOAuthToken: (provideToken) => {
          this.auth
            .requiredSpotifyAuth()
            .getAccessToken()
            .then((token) => {
              provideToken(token!.access_token);
            });
        },
        enableMediaSession: true,
      });
    }
    await webPlayer.isLoaded;
    const onReady = async ({ device_id }: WebPlaybackInstance) => {
      webPlayer.removeListener(AnthemEvents.PLAYER_READY, onReady);
      this.store.dispatch(
        this.store.action.setDevice({
          kind: "spotify",
          local: true,
          id: device_id,
        }),
      );
    };
    webPlayer.addListener(AnthemEvents.PLAYER_READY, onReady);
    webPlayer.addListener(AnthemEvents.ACCOUNT_ERROR, console.error);
    webPlayer.addListener(AnthemEvents.AUTH_ERROR, console.error);
    webPlayer.addListener(AnthemEvents.PLAYBACK_ERROR, console.error);
    webPlayer.addListener(AnthemEvents.PLAYER_INIT_ERROR, console.error);
    webPlayer.addListener(AnthemEvents.PLAYER_STATE_CHANGED, (state) => {
      console.log(AnthemEvents.PLAYER_STATE_CHANGED, state);
      this.patchStoreState(this.webPlayerStateToStoreState(state));
    });
    webPlayer.addListener(AnthemEvents.PROGRESS, ({ position }) => {
      const playedAt = this.store.state.playedAt;
      if (playedAt != null) {
        const current = getCurrentTrackTime(this.store.state.playing, playedAt);
        if (Math.abs(current - position) > 500) {
          this.patchStoreState({
            playedAt: { epochMs: Date.now(), trackMs: position },
          });
        }
      }
    });
    const connected = await webPlayer.connect();
    if (!connected) {
      webPlayer.removeListener(AnthemEvents.PLAYER_READY, onReady);
      throw new Error("Failed to connect to Spotify web playback SDK");
    }

    this.spotify.setWebPlayer(webPlayer);
  }
  webPlayerStateToStoreState(state: WebPlaybackState): Partial<PlayerState> {
    return {
      playing: !state.paused,
      repeat: this.convertRepeatMode(state.repeat_mode),
      shuffle: state.shuffle,
      song: {
        album: {
          id: state.track_window.current_track.album.uri,
          images: state.track_window.current_track.album.images,
          name: state.track_window.current_track.album.name,
        },
        artists: state.track_window.current_track.artists,
        durationMs: state.track_window.current_track.duration_ms,
        id: state.track_window.current_track.id!,
        uri: state.track_window.current_track.uri,
        name: state.track_window.current_track.name,
      },
      // TODO: track, volume?
    };
  }

  private convertRepeatMode(webPlayerRepeat: 0 | 1 | 2): Repeat {
    switch (webPlayerRepeat) {
      case 0:
        return "off";
      case 1:
        return "track";
      case 2:
        return "context";
    }
  }

  private async disconnectWebPlayer() {
    const webPlayer = this.spotify.webPlayer();
    if (webPlayer == null) {
      return;
    }
    for (const eventType of Object.values(AnthemEvents)) {
      webPlayer.removeListener(eventType);
    }
    await webPlayer.disconnect();
  }
}

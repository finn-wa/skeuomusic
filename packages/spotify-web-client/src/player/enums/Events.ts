import type { PlayerError } from "../error/PlayerError";
import type { WebPlaybackInstance, WebPlaybackState } from "../types";

export const AnthemEvents = {
  ACCOUNT_ERROR: "account_error",
  AUTH_ERROR: "authentication_error",
  AUTOPLAY_FAILED: "autoplay_failed",
  PROGRESS: "progress",
  PLAYBACK_ERROR: "playback_error",
  PLAYER_INIT_ERROR: "initialization_error",
  PLAYER_READY: "ready",
  PLAYER_NOT_READY: "not_ready",
  PLAYER_STATE_CHANGED: "player_state_changed",
} as const;

export type AnthemEventType = (typeof AnthemEvents)[keyof typeof AnthemEvents];

export type AnthemEventListener = {
  [AnthemEvents.PLAYER_READY]: (player: WebPlaybackInstance) => void;
  [AnthemEvents.PLAYER_NOT_READY]: (player: WebPlaybackInstance) => void;
  [AnthemEvents.PLAYER_STATE_CHANGED]: (player: WebPlaybackState) => void;
  [AnthemEvents.AUTOPLAY_FAILED]: () => void;
  [AnthemEvents.ACCOUNT_ERROR]: (e: PlayerError) => void;
  [AnthemEvents.AUTH_ERROR]: (e: PlayerError) => void;
  [AnthemEvents.PLAYBACK_ERROR]: (e: PlayerError) => void;
  [AnthemEvents.PLAYER_INIT_ERROR]: (e: PlayerError) => void;
  [AnthemEvents.PROGRESS]: (event: { position: number }) => void;
};

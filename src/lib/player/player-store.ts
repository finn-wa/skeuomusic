import { createStore } from "solid-js/store";
import type { Song } from "../types";
import {
  type PlayerAction,
  PlayerActionFactory,
  type PlayerActionKind,
  type PlayerActions,
} from "./player-actions";
import type { CreatePlayerClientFn, PlayerClient } from "./player-client";

export type Repeat = "off" | "track" | "context";

export type PlayerState = {
  playing: boolean;
  playedAt?: { epochMs: number; trackMs: number };
  song?: Song;
  track?: { current: number; total: number };
  shuffle: boolean;
  repeat: Repeat;
  /** As a percentage (0-100) */
  volume: number;
};

export type PlayerStore = {
  /** Read-only access to player state */
  state: Readonly<PlayerState>;
  /** Dispatch actions to trigger state changes */
  dispatch: (action: PlayerAction) => void;
  /** Factory to create actions */
  action: typeof PlayerActionFactory;
};

export function createPlayerStore(
  createClient: CreatePlayerClientFn,
): PlayerStore {
  const [state, setState] = createStore<PlayerState>({
    playing: false,
    song: null,
    track: null,
    playedAt: null,
    repeat: "off",
    shuffle: false,
    volume: 50,
  });

  type StateUpdateFn<T extends PlayerAction> = (action: T) => {
    undo?: () => void;
  };

  const stateUpdaters: {
    [K in PlayerActionKind]: StateUpdateFn<PlayerActions[K]>;
  } = {
    play: () => {
      const fallback = state.playing;
      setState("playing", true);
      return { undo: () => setState("playing", fallback) };
    },
    pause: () => {
      const fallback = state.playing;
      setState("playing", false);
      return { undo: () => setState("playing", fallback) };
    },
    setSong: (action) => {
      const fallback = state.song == null ? null : { ...state.song };
      setState("song", action.song);
      return { undo: () => setState("song", fallback) };
    },
    setVolume: (action) => {
      const fallback = state.volume;
      setState("volume", action.volume);
      return { undo: () => setState("volume", fallback) };
    },
    next: () => {
      // TODO: state change
      return {};
    },
    previous: () => {
      // TODO: state change
      return {};
    },
    setRepeat: (action) => {
      const fallback = state.repeat;
      setState("repeat", action.repeat);
      return { undo: () => setState("repeat", fallback) };
    },
    setShuffle: (action) => {
      const fallback = state.shuffle;
      setState("shuffle", action.shuffle);
      return { undo: () => setState("shuffle", fallback) };
    },
    syncExternalState: (action) => {
      setState(action.state);
      return {};
    },
    requestSync: () => ({}),
  };

  const dispatch = <T extends PlayerAction>(action: T) => {
    console.log("Action", action);
    const updateState = stateUpdaters[action.kind] as StateUpdateFn<T>;
    const update = updateState(action);
    client.applyAction(action).then((result) => {
      if (result.success) {
        return;
      }
      console.error("Failed to apply action", action, result.error);
      if (update.undo != null) {
        console.log("Reverting action", action);
        update.undo();
      }
    });
  };

  const action = PlayerActionFactory;
  const setStateFn = (state: PlayerState): void =>
    dispatch(action.syncExternalState(state));
  const client = createClient(setStateFn);

  return { state, dispatch, action };
}

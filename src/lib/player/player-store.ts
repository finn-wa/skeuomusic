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
  playedAt: { epochMs: number; trackMs: number } | null;
  song: Song | null;
  track: { current: number; total: number } | null;
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

  const updateState: {
    [K in PlayerActionKind]: (action: PlayerActions[K]) => void;
  } = {
    play: () => {
      setState("playing", true);
    },
    pause: () => {
      setState("playing", false);
    },
    setSong: (action: PlayerActions["setSong"]) => {
      setState("song", action.song);
    },
    setVolume: (action: PlayerActions["setVolume"]) => {
      setState("volume", action.volume);
    },
    next: () => {
      // TODO: state change
    },
    previous: () => {
      // TODO: state change
    },
    setRepeat: (action: PlayerActions["setRepeat"]) => {
      setState("repeat", action.repeat);
    },
    setShuffle: (action: PlayerActions["setShuffle"]) => {
      setState("shuffle", action.shuffle);
    },
    syncExternalState: (action: PlayerActions["syncExternalState"]) => {
      setState(action.state);
    },
    requestSync: () => {},
  };

  const dispatch = <T extends PlayerAction>(action: T) => {
    console.log("Action", action);
    const stateUpdateHandler = updateState[action.kind] as (action: T) => void;
    stateUpdateHandler(action);
    client.onDispatch(action);
  };
  const client = createClient((state) =>
    dispatch(PlayerActionFactory.syncExternalState(state)),
  );

  return { state, dispatch, action: PlayerActionFactory };
}

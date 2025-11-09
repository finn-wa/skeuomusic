import { createStore } from "solid-js/store";
import { PlayerActionListenerManager } from "./player-action-listeners";
import { type PlayerAction, PlayerActionFactory } from "./player-actions";
import type { PlayerState } from "./player-state";
import { PlayerStateUpdater } from "./player-state-updater";

export type PlayerStore = Readonly<{
  /** Read-only access to player state */
  state: Readonly<PlayerState>;
  /** Dispatch actions to trigger state changes */
  dispatch: (action: PlayerAction) => void;
  /** Factory to create actions */
  action: typeof PlayerActionFactory;
  /** Manage action listeners */
  listeners: Pick<PlayerActionListenerManager, "add" | "remove">;
}>;

export function createPlayerStore(): PlayerStore {
  const [state, setState] = createStore<PlayerState>({
    playing: false,
    song: undefined,
    track: undefined,
    playedAt: undefined,
    repeat: "off",
    shuffle: false,
    volume: 50,
  });
  const stateUpdater = new PlayerStateUpdater(state, setState);
  const listeners = new PlayerActionListenerManager();
  return {
    state,
    dispatch: <T extends PlayerAction>(action: T): void => {
      console.log("Action", action);
      stateUpdater.applyAction(action);
      listeners.notify(action);
    },
    action: PlayerActionFactory,
    listeners,
  };
}

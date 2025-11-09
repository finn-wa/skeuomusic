import type {
  PlayerAction,
  PlayerActionKind,
  PlayerActions,
} from "./player-actions";

export type PlayerActionListener<T extends PlayerAction = PlayerAction> = (
  action: T,
) => void;

export type PlayerActionListenerObj = {
  [K in PlayerActionKind]: (action: PlayerActions[K]) => void;
};

export class PlayerActionListenerManager {
  private listeners: PlayerActionListener[] = [];

  add(listener: PlayerActionListener): void {
    if (this.listeners.includes(listener)) {
      return;
    }
    this.listeners.push(listener);
  }

  remove(listener: PlayerActionListener): void {
    this.listeners = this.listeners.filter((x) => x !== listener);
  }

  notify(action: PlayerAction) {
    for (const listener of this.listeners) {
      listener(action);
    }
  }
}

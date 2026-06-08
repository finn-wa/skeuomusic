import type { PlayerAction, PlayerActionKind, PlayerActions } from "./player-actions";

export type PlayerActionListener<T extends PlayerAction = PlayerAction> = (
  action: T,
) => void;

export type PlayerActionHandler = {
  [K in PlayerActionKind]: PlayerActionListener<PlayerActions[K]>;
};

export function playerActionHandler(name: string, handler: PlayerActionHandler) {
  return {
    ...handler,
    applyAction<T extends PlayerAction>(action: T) {
      console.log(`[ActionHandler] ${name}: ${action.kind}`);
      const listener = handler[action.kind] as PlayerActionListener<T>;
      listener(action);
    },
  };
}

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
      try {
        listener(action);
      } catch (error) {
        console.error(
          `Error thrown while notifying listener of action: ${JSON.stringify(action)}`,
          error,
        );
      }
    }
  }
}

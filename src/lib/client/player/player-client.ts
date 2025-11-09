import type { PlayerAction } from "./store/player-actions";
import type { PlayerState } from "./store/player-state";

export type PlayerClient = {
  /** Callbacks to perform side-effects when actions occur */
  readonly applyAction: (
    action: PlayerAction,
  ) => Promise<{ success: true } | { success: false; error: unknown }>;
};

export type CreatePlayerClientFn = (
  setState: (state: PlayerState) => void,
) => PlayerClient;

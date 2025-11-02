import type { PlayerAction } from "./player-actions";
import type { PlayerState } from "./player-store";

export type PlayerClient = {
  /** Callbacks to perform side-effects when actions occur */
  readonly applyAction: (
    action: PlayerAction,
  ) => Promise<{ success: true } | { success: false; error: unknown }>;
};

export type CreatePlayerClientFn = (
  setState: (state: PlayerState) => void,
) => PlayerClient;

import type { PlayerAction } from "./player-actions";
import type { PlayerState } from "./player-store";

export type PlayerClient = {
  /** Callbacks to perform side-effects when actions occur */
  readonly onDispatch: (action: PlayerAction) => Promise<void>;
};

export type CreatePlayerClientFn = (
  patchLocalState: (state: Partial<PlayerState>) => void,
) => PlayerClient;

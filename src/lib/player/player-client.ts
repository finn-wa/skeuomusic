import type { PlayerActions, PlayerState } from "./player-store";

export type PlayerEffects = {
  [K in keyof PlayerActions]: (
    ...params: Parameters<PlayerActions[K]>
  ) => Promise<void>;
};

export type PlayerClient = {
  /** Callbacks to perform side-effects when actions occur */
  readonly effects: PlayerEffects;
  getState(): Promise<PlayerState>;
};

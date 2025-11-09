import type { Song } from "../../../types";
import type { PlayerState, Repeat } from "./player-state";

export type PlayerActionKind =
  | "play"
  | "pause"
  | "setSong"
  | "setVolume"
  | "next"
  | "previous"
  | "seek"
  | "setRepeat"
  | "setShuffle"
  | "requestSync"
  | "syncExternalState";

export const PlayerActionFactory = {
  play: () => ({ kind: "play" }),
  pause: () => ({ kind: "pause" }),
  setSong: (song: Song | undefined) => ({
    kind: "setSong",
    song,
  }),
  setVolume: (volume: number) => ({
    kind: "setVolume",
    volume,
  }),
  seek: (positionMs: number) => ({ kind: "seek", positionMs }),
  next: () => ({ kind: "next" }),
  previous: () => ({ kind: "previous" }),
  setRepeat: (repeat: Repeat) => ({ kind: "setRepeat", repeat }),
  setShuffle: (shuffle: boolean) => ({ kind: "setShuffle", shuffle }),
  requestSync: () => ({ kind: "requestSync" }),
  syncExternalState: (state: Partial<PlayerState>) => ({
    kind: "syncExternalState",
    state,
  }),
} as const satisfies {
  // biome-ignore lint/suspicious/noExplicitAny: it's necessary
  [K in PlayerActionKind]: (...params: any[]) => { kind: K };
};

export type PlayerAction = ReturnType<
  (typeof PlayerActionFactory)[PlayerActionKind]
>;

export type PlayerActions = {
  [K in PlayerActionKind]: ReturnType<(typeof PlayerActionFactory)[K]>;
};

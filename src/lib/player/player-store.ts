import { createStore } from "solid-js/store";
import type { Song } from "../types";
import type { PlayerClient } from "./player-client";

export type PlayerState = {
  playing: boolean;
  playedAt: { epochMs: number; trackMs: number } | null;
  song: Song | null;
  track: { current: number; total: number } | null;
  shuffle: boolean;
  repeat: "off" | "single" | "multiple";
  /** As a percentage (0-100) */
  volume: number;
};

export type PlayerActions = {
  play: () => void;
  pause: () => void;
  setSong: (song: Song) => void;
  setVolume: (volume: number) => void;
  next: () => void;
  previous: () => void;
  setRepeat: (repeat: PlayerState["repeat"]) => void;
  setShuffle: (shuffle: boolean) => void;
};

export type PlayerStore = {
  state: PlayerState;
  actions: PlayerActions;
};

export function createPlayerStore(client: PlayerClient): PlayerStore {
  const [state, setState] = createStore<PlayerState>({
    playing: false,
    song: null,
    track: null,
    playedAt: null,
    repeat: "off",
    shuffle: false,
    volume: 50,
  });

  const actions: PlayerActions = {
    play: () => {
      setState("playing", true);
      client.effects.play();
    },
    pause: () => {
      setState("playing", false);
      client.effects.pause();
    },
    setSong: (song: Song) => {
      setState("song", song);
      client.effects.setSong(song);
    },
    next: () => {
      // TODO: state change
      client.effects.next();
    },
    previous: () => {
      // TODO: state change
      client.effects.previous();
    },
    setRepeat: (repeat: PlayerState["repeat"]) => {
      setState("repeat", repeat);
      client.effects.setRepeat(repeat);
    },
    setShuffle: (shuffle: boolean) => {
      setState("shuffle", shuffle);
      client.effects.setShuffle(shuffle);
    },
    setVolume: (volume: number) => {
      setState("volume", volume);
      client.effects.setVolume(volume);
    },
  };

  return { state, actions };
}

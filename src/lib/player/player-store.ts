import { createStore } from "solid-js/store";
import type { PlayerClient } from "./player-client";

export type PlayerState = {
  playing: boolean;
  currentTrack: string | null;
};

export type PlayerActions = {
  play: () => void;
  pause: () => void;
  setTrack: (track: string) => void;
};

export type PlayerStore = {
  state: PlayerState;
  actions: PlayerActions;
};

export function createPlayerStore(client: PlayerClient): PlayerStore {
  const [state, setState] = createStore<PlayerState>({
    playing: false,
    currentTrack: null,
  });

  const actions: PlayerActions = {
    play: () => {
      client.play();
      setState("playing", true);
    },
    pause: () => {
      client.pause();
      setState("playing", false);
    },
    setTrack: (track: string) => {
      client.loadTrack(track);
      setState({ currentTrack: track, playing: false });
    },
  };

  return { state, actions };
}

import { createContext, useContext } from "solid-js";
import type { PlayerStore } from "./player/player-store";

export const MusicContext = createContext<{ playerStore: PlayerStore }>();

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("MusicContext not found");
  }
  return ctx;
}

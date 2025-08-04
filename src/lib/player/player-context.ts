import { createContext, useContext } from "solid-js";
import type { PlayerStore } from "./player-store";

const PlayerContext = createContext<PlayerStore>();

export function usePlayerContext() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("PlayerContext not found");
  }
  return ctx;
}

import type { Song } from "~/lib/types";

export type PlayerState = {
  playing: boolean;
  playedAt?: { epochMs: number; trackMs: number };
  song?: Song;
  track?: { current: number; total: number };
  shuffle: boolean;
  repeat: Repeat;
  /** As a percentage (0-100) */
  volume: number;
};

export type Repeat = "off" | "track" | "context";

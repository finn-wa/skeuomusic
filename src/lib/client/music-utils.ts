import { HOURS_S, MINS_MS, MINS_S, SECS_MS } from "../constants";
import type { Track } from "../types";

/** Returns the total runtime of the tracks in minutes */
export function getRuntimeMins(tracks: Pick<Track, "durationMs">[]): number {
  const runtimeMs = tracks.reduce((acc, curr) => acc + curr.durationMs, 0);
  return Math.round(runtimeMs / MINS_MS);
}

function leadingZero(minsOrSecs: number): string {
  return minsOrSecs >= 10 ? minsOrSecs.toString() : `0${minsOrSecs}`;
}

export function formatTrackTimeMs(durationMs: number) {
  const durationSecs = Math.round(durationMs / SECS_MS);
  return formatTrackTimeSecs(durationSecs);
}

export function formatTrackTimeSecs(durationSecs: number) {
  const hours = Math.floor(durationSecs / HOURS_S) % 60;
  const mins = Math.floor(durationSecs / MINS_S) % 60;
  const secs = durationSecs % 60;
  if (hours > 0) {
    return `${hours}:${leadingZero(mins)}:${leadingZero(secs)}`;
  }
  return `${mins}:${leadingZero(secs)}`;
}

export function formatArtists(artists: { name: string }[]): string {
  return artists.map((artist) => artist.name).join(", ");
}

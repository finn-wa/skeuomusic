export type PlayerClient = {
  loadTrack: (trackId: string) => void;
  play: () => void;
  pause: () => void;
};

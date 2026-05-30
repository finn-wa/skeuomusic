import type { IconDefIds } from "@/shared/svg-utils";

export function PlayerIconGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" x2="0" y1="0" y2="39" gradientUnits="userSpaceOnUse">
      <stop stopColor="var(--player-icon-gradient-top)" offset="20%" />
      <stop stopColor="var(--player-icon-gradient-bottom)" offset="100%" />
    </linearGradient>
  );
}

export function PlaybackControlPanelIconShadow({ id }: { id: string }) {
  return (
    <filter id={id}>
      <feOffset dx="0" dy="-2" result="offset" />
      <feFlood floodColor="black" floodOpacity="0.95" />
      <feComposite in="color" in2="offset" operator="in" result={id} />
      <feMerge>
        <feMergeNode in={id} />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export function PlaybackControlPanelIconDefs({ ids }: { ids: IconDefIds }) {
  return (
    <defs>
      <PlayerIconGradient id={ids.gradient} />
      <PlaybackControlPanelIconShadow id={ids.shadow} />
    </defs>
  );
}

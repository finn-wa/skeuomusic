import type { IconDefIds } from "~/lib/client/svg-utils";

export function PlayerIconGradient(props: { id: string }) {
  return (
    <linearGradient
      id={props.id}
      x1="0"
      x2="0"
      y1="0"
      y2="39"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="var(--player-icon-gradient-top)" offset="20%" />
      <stop stop-color="var(--player-icon-gradient-bottom)" offset="100%" />
    </linearGradient>
  );
}

export function PlaybackControlPanelIconShadow(props: { id: string }) {
  return (
    <filter id={props.id}>
      <feOffset dx="0" dy="-2" result="offset" />
      <feFlood flood-color="black" flood-opacity="0.95" />
      <feComposite in="color" in2="offset" operator="in" result={props.id} />
      <feMerge>
        <feMergeNode in={props.id} />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export function PlaybackControlPanelIconDefs(props: { ids: IconDefIds }) {
  return (
    <defs>
      <PlayerIconGradient id={props.ids.gradient} />
      <PlaybackControlPanelIconShadow id={props.ids.shadow} />
    </defs>
  );
}

export function NavTabMoreIcon() {
  return (
    <svg viewBox="0 0 72 60">
      <title>More</title>
      <defs>
        <filter id="circleEffects" color-interpolation-filters="sRGB">
          <feOffset dx="0" dy="3" />
          <feGaussianBlur result="blur" stdDeviation="2.5" />
          <feFlood flood-color="black" flood-opacity="0.6" result="flood" />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="composite"
          />
          <feBlend in="blur" in2="composite" />
        </filter>
        <filter id="glow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="white" />
        </filter>

        <circle id="circle" cx="14" cy="30" r="7" fill="#a2a2a2" />

        <clipPath id="circleClip">
          <use href="#circle" />
        </clipPath>

        <g id="prettyCircle">
          <use href="#circle" filter="url(#glow)" />
          <use
            href="#circle"
            clip-path="url(#circleClip)"
            filter="url(#circleEffects)"
          />
        </g>
      </defs>

      <use href="#prettyCircle" />
      <use href="#prettyCircle" transform="translate(22)" />
      <use href="#prettyCircle" transform="translate(44)" />
    </svg>
  );
}

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

export function NavTabSongsIcon() {
  return (
    <svg viewBox="0 0 72 60">
      <title>Songs</title>
      <defs>
        <filter id="noteEffects" color-interpolation-filters="sRGB">
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
        <filter id="noteGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="white" />
        </filter>
        <linearGradient
          id="noteGradient"
          x1="0"
          x2="0"
          y1="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7c7c7cff" offset="15%" />
          <stop stop-color="#c1c1c1ff" offset="85%" />
        </linearGradient>

        <path
          id="note"
          fill="url(#noteGradient)"
          transform="matrix(.985 -.173 .139 .99 0 0)"
          d="m33 10.8-4.73 33.5c-6.49-1.4-16.7-3.13-16.9 6.11 0.233 4.1 3.92 6.77 11.1 6.86 6.11 0.0812 11.1-3.07 11.1-6.86 0-0.0485-0.0017-0.0966-0.0034-0.145l0.0232 0.0041 3.2-22.7c5.95 1.04 7.37 5.33 6.82 9.27-0.556 3.94-3.95 6.38-3.09 7.54s6.36-1.92 7.47-9.8c1.39-9.85-12.1-15.2-11-23.1 6.74e-4 -0.0048 0.0012-0.0087 0.0019-0.0135z"
        />
        <clipPath id="noteClip">
          <use href="#note" />
        </clipPath>
      </defs>

      <g>
        <use href="#note" filter="url(#noteGlow)" />
        <use
          href="#note"
          clip-path="url(#noteClip)"
          filter="url(#noteEffects)"
        />
      </g>
    </svg>
  );
}

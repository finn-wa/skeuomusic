// TODO: Icons could use some clean up
// See if there's a better shadow method in Inkscape
// The clip path hack is making it look kinda blurry sometimes

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

function PlaylistsIconPath() {
  return (
    <>
      <path
        id="playlistsNote"
        fill="url(#playlistsGradient)"
        d="m44.8 5.02 1e-6 34c-6.59-0.26-16.9-0.212-15.8 8.98 0.8 4.02 4.8 6.02 11.9 4.88 6.03-0.979 10.5-4.96 9.95-8.71-0.0067-0.048-0.0151-0.0953-0.0234-0.143l0.0234 3.5e-5 -1e-6 -4 1e-6 -1v-18c6 8e-6 8 4 8 8-1e-6 4-3 7-2 8 1 1 6-3 6-11 1e-6 -10-14-13-14-21-3e-6 -0.00487-2.7e-5 -0.00882 0-0.0137z"
      />
      <rect x="5" y="11" width="36" height="4" fill="url(#playlistsGradient)" />
      <rect x="5" y="21" width="36" height="4" fill="url(#playlistsGradient)" />
      <rect x="5" y="31" width="36" height="4" fill="url(#playlistsGradient)" />
      <path d="m5 41v4h20s1-3 3-4h-3-20z" fill="url(#playlistsGradient)" />
    </>
  );
}

export function NavTabPlaylistsIcon() {
  return (
    <svg viewBox="0 0 72 60">
      <title>Playlists</title>
      <defs>
        <filter id="playlistsEffects" color-interpolation-filters="sRGB">
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
        <filter id="playlistsGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="white" />
        </filter>
        <linearGradient
          id="playlistsGradient"
          x1="0"
          x2="0"
          y1="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7c7c7cff" offset="15%" />
          <stop stop-color="#c1c1c1ff" offset="85%" />
        </linearGradient>

        <clipPath id="playlistsClip">
          <PlaylistsIconPath />
        </clipPath>
        <g id="playlistsIcon">
          <PlaylistsIconPath />
        </g>
      </defs>

      <g>
        <use href="#playlistsIcon" filter="url(#playlistsGlow)" />
        <use
          href="#playlistsIcon"
          clip-path="url(#playlistsClip)"
          filter="url(#playlistsEffects)"
        />
      </g>
    </svg>
  );
}

export function AlbumIconPath() {
  return (
    <>
      <path
        fill="url(#albumsGradient)"
        d="m20 14v39h39v-39h-39zm18 4h2c0 6 9 7 9 13 0 4.69-4 8-5 7s2-2.66 2-5c-1e-6 -2.34-0.184-4-4-4v12c0 2.23-2.58 4.48-6.41 5.05-4.49 0.671-7.03-0.502-7.54-2.86-0.675-5.39 5.86-5.42 10-5.26l-0.0957-19.9z"
      />
      <path fill="url(#albumsGradient)" d="m13 44v-37h37v3h-34v34z" />
    </>
  );
}

export function NavTabAlbumIcon() {
  return (
    <svg viewBox="0 0 72 60">
      <title>Albums</title>
      <defs>
        <filter id="albumsEffects" color-interpolation-filters="sRGB">
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
        <filter id="albumsGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="white" />
        </filter>
        <linearGradient
          id="albumsGradient"
          x1="0"
          x2="0"
          y1="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7c7c7cff" offset="15%" />
          <stop stop-color="#c1c1c1ff" offset="85%" />
        </linearGradient>

        <clipPath id="albumsClip">
          <AlbumIconPath />
        </clipPath>
        <g id="albumsIcon">
          <AlbumIconPath />
        </g>
      </defs>

      <g>
        <use href="#albumsIcon" filter="url(#albumsGlow)" />
        <use
          href="#albumsIcon"
          clip-path="url(#albumsClip)"
          filter="url(#albumsEffects)"
        />
      </g>
    </svg>
  );
}

export function ArtistIconPath() {
  return (
    <>
      <path
        fill="url(#albumsGradient)"
        d="m24.5 22a3.5 3.39 0 0 0-3.11 1.83l-19.4 6.17 1 3 6-1 3 5v20h2v-25l2-2 6.38-1.92a3.5 3.39 0 0 0 2.12 0.689 3.5 3.39 0 0 0 3.5-3.39 3.5 3.39 0 0 0-3.5-3.39z"
      />
      <path
        fill="url(#albumsGradient)"
        d="m36 57h38s1.1-3.45-6-14c-3-4.46-6-7-6-10 0-2 2-8 2-12s0-11-8-14c-7.62-2.86-11.9-1.13-13.5-0.644-3.47 1.03-5.11 5.43-4.8 5.86 0.309 0.422 2.34-3.21 3.13-3.21-1.05 1-2.79 4.75-3.13 5.61-3.95 2.09-4.51 2.39-4.51 3.39s0.843 2.3 1.84 2c-1 1-2 2.27-0.428 3.5-1 0-1.57 1.89-0.572 2.5-0.234 1-1.01 2.34-0.463 3.33 1.91 3.45 6.74-0.804 8.45 6.41 0.925 3.89-2.99 2.26-3.99 4.26 0 4 3 3 3 5s-5 4-5 7z"
      />
    </>
  );
}

export function NavTabArtistIcon() {
  return (
    <svg viewBox="0 0 78 60">
      <title>Artists</title>
      <defs>
        <filter id="artistsEffects" color-interpolation-filters="sRGB">
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
        <filter id="artistsGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="white" />
        </filter>
        <linearGradient
          id="artistsGradient"
          x1="0"
          x2="0"
          y1="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7c7c7cff" offset="15%" />
          <stop stop-color="#c1c1c1ff" offset="85%" />
        </linearGradient>

        <clipPath id="artistsClip">
          <ArtistIconPath />
        </clipPath>
        <g id="artistsIcon">
          <ArtistIconPath />
        </g>
      </defs>

      <g>
        <use href="#artistsIcon" filter="url(#artistsGlow)" />
        <use
          href="#artistsIcon"
          clip-path="url(#artistsClip)"
          filter="url(#artistsEffects)"
        />
      </g>
    </svg>
  );
}

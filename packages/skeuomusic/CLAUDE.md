# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A skeuomorphic Spotify music player web app styled after iOS 6's Music app, built with SolidJS and TanStack Start. Supports in-browser playback via the Spotify Web Playback SDK and remote control of other Spotify devices.

## Commands

Uses **pnpm** as the package manager.

```bash
pnpm run dev          # Start HTTPS dev server on localhost:3000
pnpm run build        # Vite build
pnpm run test         # Run tests once with Vitest

# Linting & formatting via oxc
pnpm fmt # Runs oxfmt
pnpm lint # Runs oxlint
```

Run a single test file: `pnpm run test -- path/to/file.test.ts`

## Architecture

### Routing (TanStack Start, file-based)

`src/routes/` mirrors URL structure:

- `__root.tsx` — root layout, provides `AuthContext`
- `index.tsx` — login/landing page
- `music.tsx` — authenticated app shell; creates and provides `MusicContext` (playerStore + Spotify APIs)
- `music/library/` — library browsing pages
- `music/player/` — now-playing detail view
- `api/spotify/` — server-side API route handlers (token exchange, proxying)
- `redirect.spotify.tsx` — OAuth callback handler

### State management: PlayerStore

`src/lib/client/player/store/` implements a Redux-like pattern for player state:

- **`player-store.ts`** — `createPlayerStore()` returns `{ state, dispatch, action, listeners }`. All state mutations go through `dispatch(action)`.
- **`player-actions.ts`** — `PlayerActionFactory` creates typed actions (`play`, `pause`, `setSong`, `seek`, `next`, `previous`, `setVolume`, `setRepeat`, `setShuffle`, `setDevice`, `requestSync`, `syncExternalState`)
- **`player-state-updater.ts`** — applies actions to the SolidJS store (via `createStore`)
- **`player-action-listeners.ts`** — `PlayerActionListenerManager` lets adapters subscribe to dispatched actions; `playerActionHandler` is a helper for building typed handler maps

### Spotify adapter

`src/lib/client/player/adapter/spotify-player-adapter.ts` bridges `PlayerStore` actions to Spotify APIs:

- Registers as a listener on `playerStore.listeners`
- Routes actions to either the **Spotify REST API** (remote devices) or the **Spotify Web Playback SDK** (local in-browser player), depending on `state.device`
- `getSpotifyPlayerState()` fetches and normalizes current Spotify playback into `PlayerState`
- The Web Playback SDK is lazily initialised when the user selects the local device

### Contexts

- **`AuthContext`** (`src/lib/client/auth-context.ts`) — provided at root; manages `SpotifyAuth` token lifecycle
- **`MusicContext`** (`src/lib/client/music-context.ts`) — provided in `music.tsx`; pnpmdles `playerStore` and typed Spotify API accessors (`albums`, `artists`, `player`, `playlists`, `tracks`)

Use `useMusicContext()` / `useAuthContext()` inside components.

### Server/client split

- `src/lib/server/` — server-only code (session management, direct Spotify data fetching)
- `src/lib/client/` — browser code (contexts, player store, auth)
- API routes in `src/routes/api/` run server-side and are the boundary between the two

### Styling

Pure CSS modules in `src/styles/`. The skeuomorphic iOS 6 aesthetic is the point — prefer CSS over component libraries.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A skeuomorphic Spotify music player web app styled after iOS 6's Music app, built with React 19 and TanStack Start. This is a React rewrite of the original SolidJS `skeuomusic` package, written to learn React.

## Commands

Uses **pnpm** as the package manager.

```bash
pnpm run dev          # Start dev server on localhost:3000
pnpm run build        # Vite build
pnpm run test         # Run tests once with Vitest

# Linting & formatting via oxc
pnpm fmt   # Runs oxfmt
pnpm lint  # Runs oxlint
```

Run a single test file: `pnpm run test -- path/to/file.test.tsx`

## Architecture

### Routing (TanStack Start, file-based)

Routes live in `src/routes/` and mirror the URL structure:

- `__root.tsx` — root layout (`<html>`, `<head>`, `<body>` shell)
- `index.tsx` — landing/login page (renders `<Welcome>` with `<SlideToUnlock>`)
- `music/library.tsx` — authenticated app shell with `<Header>` and `<NavBar>`; nested routes render via `<Outlet>`

`src/routeTree.gen.ts` is **auto-generated** by the TanStack Router Vite plugin — do not edit it manually. It is updated automatically when the dev server runs or on build.

### Component structure

`src/components/` is organized by feature, including:

- `header/` — `<Header>` top bar
- `nav-bar/` — `<NavBar>` bottom tab bar, `<NavTab>`, `<NavArrowButton>`
- `icons/` — SVG icon components (play/pause, shuffle, repeat, nav tabs, prev/next). Shared `<IconDefs>` for `<defs>` that need to be in the document.

### Styling

- `src/styles/` — global CSS files imported via `global.css` (variables, skeuomorphic effects, layout primitives, typography, etc.)
- Component-scoped styles use **CSS Modules** (`.module.css` co-located with the component)
- The skeuomorphic iOS 6 aesthetic is the point — prefer hand-crafted CSS over UI component libraries

### Path alias

Source files use `@/` to import from `src/`:

```ts
import Foo from "@/components/foo/foo";
```

Defined in `tsconfig.json` paths and resolved by Vite via `tsconfigPaths`.

### Testing

Vitest + jsdom + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`). Test files live next to the component they test (`.test.tsx`). The setup file at `src/test-setup.ts` extends `expect` with jest-dom matchers.

### Shared utilities

`src/shared/` holds non-component code:

- `constants.ts` — Spotify OAuth scopes, timing constants, scroll behaviour config
- `font-width.ts` — canvas-based text width measurement
- `svg-utils.ts` — SVG helpers

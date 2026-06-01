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

Run a single test file: `pnpm run test path/to/file.test.tsx` (no `--` — passing `--` routes the path to pnpm rather than Vitest, breaking file filtering)

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

Vitest Browser Mode (Chromium via Playwright) + `vitest-browser-react`. Tests run in a real browser — CSS and layout are computed, no JSDOM approximation. Test files live next to the component they test (`.test.tsx`).

**Rendering**: `render()` from `vitest-browser-react` is async and returns a `screen` with Locator-based queries.

```ts
import { render } from "vitest-browser-react";

const screen = await render(<MyComponent />);
await expect.element(screen.getByRole("button")).toBeInTheDocument();
```

**User interaction**: `userEvent` from `vitest/browser`.

```ts
import { userEvent } from "vitest/browser";

await userEvent.click(screen.getByRole("button"));
await userEvent.fill(screen.getByRole("textbox"), "hello");
```

**Async assertions**: use `expect.poll` when an assertion depends on async side effects (e.g. CSS transitions, timers). Pass a callback that returns the value to assert on — do not pass the value directly or it will be evaluated once rather than polled.

```ts
// Poll a DOM query until the element appears
await expect.poll(() => document.querySelector(".element")).toBeTruthy();

// Poll a spy — wrap in () => so the spy isn't called by the poller
await expect.poll(() => mockFn).toHaveBeenCalled();
```

**Notes**:

- `getByRole`, `getByText`, etc. return Locators — assert with `await expect.element(locator)`
- No `queryBy*` methods exist; use `getBy*` with `.not.toBeInTheDocument()` for absence checks
- `getByTitle` does not match SVG `<title>` elements in browser mode; use `container.querySelector("svg title")` instead
- DOM element assertions (e.g. on `container.querySelector(...)`) are synchronous — Vitest provides these matchers natively

**Shared mocks** live in `src/test/mocks/`:

- `link.tsx` — `MockLink`: a plain `<a href>` replacement for TanStack Router's `<Link>`

### Shared utilities

`src/shared/` holds non-component code:

- `constants.ts` — Spotify OAuth scopes, timing constants, scroll behaviour config
- `font-width.ts` — canvas-based text width measurement
- `svg-utils.ts` — SVG helpers

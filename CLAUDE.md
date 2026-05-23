# skeuomusic-monorepo

## Overview

pnpm workspace monorepo with two packages:

- **`packages/skeuomusic`** — the skeuomusic SolidJS web app (see its own `CLAUDE.md` for full details)
- **`packages/spotify-web-client`** — TypeScript Spotify API client consumed by the app as `spotify-web-client: workspace:*`

## Commands

Uses **pnpm** (v11) and **Node ≥ 24**.

```bash
# Run from the repo root to affect all packages
pnpm lint   # oxlint across the workspace
pnpm fmt    # oxfmt across the workspace

# Run from a package directory for package-specific tasks, or use --filter with package name
pnpm --filter skeuomusic run dev          # start HTTPS dev server in app
pnpm --filter skeuomusic run test         # run Vitest tests once
pnpm --filter spotify-web-client run generate-client  # regenerate OpenAPI client
```

## Package relationship

`packages/app` imports `spotify-web-client` directly from source (no build step required for the client — its `main`/`types` both point to `src/index.ts`). Changes to `packages/spotify-web-client/src/` are immediately reflected in the app without rebuilding.

The REST client inside `packages/spotify-web-client/src/openapi/` is **auto-generated** from the Spotify OpenAPI spec — do not edit those files manually. Run `generate-client` to regenerate after spec changes.

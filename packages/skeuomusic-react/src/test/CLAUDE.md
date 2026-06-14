# Testing

Vitest Browser Mode (Chromium via Playwright) + `vitest-browser-react`: tests run in a real browser, so CSS/layout are computed (no JSDOM).
Test files live next to their component (`.test.tsx`) and have a top-level describe block.

## Rendering

`render()` from `vitest-browser-react` — async, returns a `screen` of Locator queries. For router-dependent components (`<Link>`, route hooks) use `renderWithRouter` from `@/test/router-utils` (same return shape, optional route context).

```ts
import { render } from "vitest-browser-react";
import { renderWithRouter } from "@/test/router-utils";

const screen = await render(<MyComponent />);
const screen = await renderWithRouter(<Header />);
```

## User interaction

`userEvent` from `vitest/browser` — drives the real browser via CDP (not faked events). Pass a Locator, not a DOM node.

```ts
import { userEvent } from "vitest/browser";

await userEvent.click(screen.getByRole("button"));
await userEvent.fill(input, "hello"); // replaces value
await userEvent.type(input, "abc"); // key-by-key
```

## Assertions

`expect.element(locator)` — the default for Locators. It's shorthand for `expect.poll(() => locator)`: re-queries the live DOM and retries until pass/timeout, absorbing render/transition asynchrony. Optional 2nd arg `{ interval, timeout, message }`.

`expect.poll(() => value)` — for non-Locator async values (spies, raw DOM queries). Pass a callback, not the value, or it's read once.

Plain `expect` — synchronous values only (an already-called spy, a `container` matcher).

```ts
await expect.element(screen.getByText("Loading...")).toBeVisible();
await expect.poll(() => onUnlock).toHaveBeenCalled();
expect(onQueryChanged).toHaveBeenCalledWith("hello");
```

## Locators

Vitest uses a fork of Playwright's locators.
Query with `getByRole`/`getByText`/`getByLabelText`/`getByAltText`/`getByTestId`, not `container.querySelector` — they auto-retry against the live DOM.
Prefer role/text/label; add a `data-testid` only when nothing else targets the element (e.g. sibling `<li>`s).

- Compose by chaining, not `within()`: `screen.getByTestId("section-A").getByRole("listitem")`. Narrow with `.filter({ hasText })`, pick with `.nth(i)`, match all with a regex (`getByTestId(/^list-item-/)`).
- Keep Locators around and act later — they survive re-renders.
- `.elements()` returns matched nodes synchronously in document order (wrap in `expect.poll` for ordering assertions). `.element()`/`.query()` throw on multiple matches; `.query()` returns `null` on none.
- Use `.toBeVisible()` / `.not.toBeVisible()` over reading `style.display` (handles ancestor `display: none`).

## Notes

- No `queryBy*` methods — use `getBy*` + `.not.toBeInTheDocument()` for absence (retries, unlike `.query()`).
- `getByTitle` misses SVG `<title>`; use `container.querySelector("svg title")`.
- `container` (from `render`/`renderWithRouter`) is the escape hatch for what no Locator covers (SVG attrs, `toBeEmptyDOMElement`, raw counts); its matchers are synchronous (plain `expect`).
- Components auto-unmount before the next test; import from `vitest-browser-react/pure` to opt out.

## Shared mocks

`src/test/mocks/` — no mocks exist yet.

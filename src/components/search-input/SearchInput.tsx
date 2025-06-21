import type { Signal } from "solid-js";

export default function SearchInput(props: {
  query: Signal<string>;
}) {
  const [query, setQuery] = props.query;
  return (
    <form class="search-container" on:submit={(e) => e.preventDefault()}>
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="1.625rem"
        height="1.625rem"
        viewBox="0 0 32 32"
      >
        <title>Search</title>
        <path
          fill="currentColor"
          d="m19.7 17.7l6.6 6.6-2 2-6.6-6.6m0.6-0.4q-0.6 0.5-1.2 0.8-0.7 0.4-1.4 0.7-0.7 0.3-1.5 0.4-0.8 0.1-1.5 0.1c-1.2 0-2.3-0.2-3.3-0.6-1.1-0.5-2.1-1.1-2.9-1.9-0.8-0.8-1.4-1.8-1.8-2.8-0.5-1.1-0.7-2.2-0.7-3.3 0-1.2 0.2-2.3 0.7-3.3 0.4-1.1 1-2.1 1.8-2.9 0.8-0.8 1.8-1.4 2.9-1.8 1-0.5 2.1-0.7 3.3-0.7 1.1 0 2.2 0.2 3.3 0.7 1 0.4 2 1 2.8 1.8 0.8 0.8 1.4 1.8 1.9 2.9 0.4 1 0.6 2.1 0.6 3.3 0 2.1-0.8 4.1-2 5.6m-6.6-11.6c-3.4 0-6 2.6-6 6 0 3.3 2.6 6 6 6 3.3 0 6-2.7 6-6 0-3.4-2.7-6-6-6z"
        />
      </svg>
      <input
        type="search"
        class="search-input"
        value={query() ?? ""}
        onInput={(e) => setQuery(e.currentTarget.value)}
        placeholder="Search"
      />
      <button
        type="reset"
        onClick={() => setQuery("")}
        class="search-clear-button"
        style={{ display: query() ? undefined : "none" }}
        aria-label="Clear search"
        data-testid="clearSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 16 16"
        >
          <title>Clear</title>
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8L4.22 5.28a.75.75 0 0 1 0-1.06"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}

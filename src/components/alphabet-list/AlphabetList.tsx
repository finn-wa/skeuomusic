import type { Accessor, JSXElement } from "solid-js";
import { For, Show, createSignal } from "solid-js";
import { INITIAL_SCROLL_ID } from "~/lib/constants";
import type { Item } from "~/lib/types";
import ListItem from "../list-item/ListItem";
import PageMessage from "../page-message/PageMessage";
import SearchInput from "../search-input/SearchInput";

export interface AlphabetListProps<T extends Item> {
  namePlural: string;
  items: Accessor<T[]>;
  hideItemCount?: boolean;
  itemRenderer?: (item: T, hide?: Accessor<boolean>) => JSXElement;
}

type ItemGroup<T extends Item> = {
  letter: string;
  items: T[];
};

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "#",
] as const;
type Letter = (typeof letters)[number];
type SortableItem<T> = { key: string; value: T };

type GroupedItems<T> = { [K in Letter]: SortableItem<T>[] };

const letterRegex = /^[A-Z]/;

function getLetter(uppercaseChar: string): Letter {
  if (letterRegex.test(uppercaseChar)) {
    return uppercaseChar as Letter;
  }
  return "#";
}

function groupItems<T extends Item>(sortedItems: SortableItem<T>[]) {
  const groups = Object.fromEntries(
    letters.map((letter) => [letter, [] as SortableItem<T>[]]),
  ) as GroupedItems<T>;

  for (const value of sortedItems) {
    const letter = getLetter(value.key[0] ?? "");
    groups[letter].push(value);
  }
  return groups;
}

export default function AlphabetList<T extends Item>({
  items,
  namePlural,
  hideItemCount,
  itemRenderer = (item, hide) => <ListItem name={item.name} hide={hide} />,
}: AlphabetListProps<T>) {
  const searchSignal = createSignal("");
  const [search] = searchSignal;

  const sortedItems = (): SortableItem<T>[] =>
    items()
      .map((value) => ({ value, key: value.name.trim().toUpperCase() }))
      .sort((a, b) => a.key.localeCompare(b.key));

  const itemGroups = () => groupItems(sortedItems());

  const capitalisedNamePlural =
    (namePlural[0]?.toUpperCase() ?? "") + (namePlural.substring(1) ?? "");

  /** Set of item keys that match the current query */
  const visibleItems = () => {
    const query = search().trim().toUpperCase();
    const visible = new Set<string>();
    for (const item of sortedItems()) {
      if (item.key.includes(query)) {
        visible.add(item.key);
      }
    }
    return visible;
  };

  return (
    <>
      <SearchInput query={searchSignal} />
      <div class="alphabet-items-container" id={INITIAL_SCROLL_ID}>
        <Show
          when={visibleItems().size > 0}
          fallback={
            <PageMessage
              message={items().length > 0 ? "No results" : `No ${namePlural}`}
            />
          }
        >
          <ol>
            <For each={letters}>
              {(letter) => {
                const items = () => itemGroups()[letter];
                const hasVisibleItems = () =>
                  items().some((item) => visibleItems().has(item.key));
                return (
                  <li
                    id={letter}
                    class="alphabet-sublist"
                    style={{
                      visibility: hasVisibleItems() ? undefined : "hidden",
                    }}
                  >
                    <div
                      class="emboss-y alphabet-indicator"
                      style={{
                        display: hasVisibleItems() ? undefined : "none",
                      }}
                    >
                      <span>{letter}</span>
                    </div>
                    <ol>
                      <For each={items()}>
                        {({ key, value }) =>
                          itemRenderer(value, () => !visibleItems().has(key))
                        }
                      </For>
                    </ol>
                  </li>
                );
              }}
            </For>
          </ol>
          <Show when={!hideItemCount}>
            <div class="alphabet-footer">
              <span class="page-msg">
                {visibleItems().size}{" "}
                {search() ? "Results" : capitalisedNamePlural}
              </span>
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}

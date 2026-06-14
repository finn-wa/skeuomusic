import { INITIAL_SCROLL_ID } from "@/shared/constants";
import type { Item } from "@/shared/types";
import {
  Suspense,
  use,
  useDeferredValue,
  useMemo,
  useState,
  type ComponentType,
} from "react";
import ListItem, { type ItemWithLink } from "../list-item/list-item";
import PageMessage, { LoadingPage } from "../page-message/page-message";
import SearchInput from "../search-input/search-input";
import AlphabetIndex from "./alphabet-index";
import { LETTERS, LETTER_LABEL, type Letter } from "./letters";
import { plural, singular } from "@/shared/plural";

export type AlphabetListProps<T extends ItemWithLink> = {
  items: Promise<T[]>;
  noun: string | { singular: string; plural: string };
  hideItemCount?: boolean;
  hideIndex?: boolean;
  itemComponent?: ComponentType<ItemRendererProps<T>>;
};

export type ItemRendererProps<T extends ItemWithLink> = {
  item: T;
  hide?: boolean;
};

/**
 * Renders a large list of items in alphabetical order. Includes a search bar at the top
 * to filter the items, and an optional index on the side to jump to a letter.
 */
export default function AlphabetList<T extends Item>({
  items,
  noun,
  itemComponent,
  hideItemCount,
  hideIndex,
}: AlphabetListProps<T>) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  return (
    <>
      <div className="content-scroll">
        <SearchInput onQueryChanged={(value) => setSearch(value)} />
        <div id={INITIAL_SCROLL_ID}></div>
        <Suspense name={singular(noun) + "AlphabetList"} fallback={<LoadingPage />}>
          <AlphabetListItems
            items={items}
            search={deferredSearch}
            noun={noun}
            itemComponent={itemComponent}
            hideItemCount={hideItemCount}
          />
        </Suspense>
      </div>
      {!hideIndex && <AlphabetIndex />}
    </>
  );
}

type AlphabetListItemsProps<T extends ItemWithLink> = Omit<
  AlphabetListProps<T>,
  "hideIndex"
> & {
  search: string;
};

function AlphabetListItems<T extends Item>({
  items,
  search,
  noun,
  hideItemCount,
  itemComponent: ItemComponent = ListItem,
}: AlphabetListItemsProps<T>) {
  const query = (search ?? "").trim().toUpperCase();
  const resolvedItems = use(items);
  const sortedItems = useMemo(() => sortItems(resolvedItems), [resolvedItems]);
  const groupedItems = useMemo(() => groupItems(sortedItems), [sortedItems]);
  const visibleItemIds = useMemo(
    () => filterItems(sortedItems, query),
    [sortedItems, query],
  );
  const showItemCount = !hideItemCount && visibleItemIds.size > 0;
  if (visibleItemIds.size === 0) {
    return (
      <PageMessage
        message={resolvedItems.length > 0 ? "No Results" : `No ${plural(noun)}`}
      />
    );
  }
  return (
    <>
      <ul>
        {LETTERS.map((letter) => {
          const letterItems = groupedItems[letter];
          const hasVisibleItems = letterItems.some((item) => visibleItemIds.has(item.id));
          return (
            // We don't apply display: none to list sections even if they have no
            // visible items so that the index can still to jump to their position
            <li
              id={LETTER_LABEL[letter]}
              key={letter}
              className="list-section"
              data-testid={`list-section-${letter}`}
            >
              <div
                className="section-header"
                style={{ display: hasVisibleItems ? undefined : "none" }}
              >
                <div className="section-header-border">
                  <span>{LETTER_LABEL[letter]}</span>
                </div>
              </div>
              <ul>
                {letterItems.map((item) => (
                  <ItemComponent
                    key={item.id}
                    item={item}
                    hide={!visibleItemIds.has(item.id)}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      {showItemCount && (
        <div className="list-footer">
          <span className="page-msg">
            {visibleItemIds.size} {plural(search ? "Result" : noun, visibleItemIds.size)}
          </span>
        </div>
      )}
    </>
  );
}

type SortableItem<T extends Item> = {
  /** The value name, trimmed and uppercased */
  sortKey: string;
  value: T;
};

const lettersSet: ReadonlySet<string> = new Set(LETTERS.slice(0, -1));
function getLetter(uppercaseChar: string): Letter {
  if (lettersSet.has(uppercaseChar)) {
    return uppercaseChar as Letter;
  }
  return "#";
}

function sortItems<T extends Item>(items: T[]): SortableItem<T>[] {
  return items
    .map((value) => ({ value, sortKey: value.name.trim().toUpperCase() }))
    .sort(
      (a, b) =>
        a.sortKey.localeCompare(b.sortKey) || a.value.name.localeCompare(b.value.name),
    );
}

function groupItems<T extends Item>(
  sortedItems: SortableItem<T>[],
): { [K in Letter]: T[] } {
  const groups = Object.fromEntries(LETTERS.map((letter) => [letter, [] as T[]])) as {
    [K in Letter]: T[];
  };
  for (const item of sortedItems) {
    const letter = getLetter(item.sortKey[0] ?? "");
    groups[letter].push(item.value);
  }
  return groups;
}

/** Filters matching items and returns their IDs. */
function filterItems<T extends Item>(
  sortedItems: SortableItem<T>[],
  search: string,
): Set<string> {
  /** Set of item keys that match the current query */
  const query = search.trim().toUpperCase();
  const visibleItems = new Set<string>();
  for (const item of sortedItems) {
    if (item.sortKey.includes(query)) {
      visibleItems.add(item.value.id);
    }
  }
  return visibleItems;
}

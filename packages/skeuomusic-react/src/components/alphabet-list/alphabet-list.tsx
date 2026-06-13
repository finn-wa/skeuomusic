import { INITIAL_SCROLL_ID } from "@/shared/constants";
import type { Item } from "@/shared/types";
import React, { useDeferredValue, useMemo, useState } from "react";
import PageMessage from "../page-message/page-message";
import SearchInput from "../search-input/search-input";
import AlphabetIndex from "./alphabet-index";
import { LETTERS, LETTER_LABEL, type Letter } from "./alphabet-list-model";
import ListItem, { type ItemWithLink } from "../list-item/list-item";

export type ItemRendererProps<T extends ItemWithLink> = {
  item: T;
  hide?: boolean;
};

export interface AlphabetListProps<T extends ItemWithLink> {
  namePlural: string;
  items: T[];
  hideItemCount?: boolean;
  hideIndex?: boolean;
  itemComponent?: React.ComponentType<ItemRendererProps<T>>;
}

type SortableItem<T> = { key: string; value: T; hide?: boolean };

type GroupedItems<T> = { [K in Letter]: SortableItem<T>[] };

const lettersSet: ReadonlySet<string> = new Set(LETTERS.slice(0, -1));
function getLetter(uppercaseChar: string): Letter {
  if (lettersSet.has(uppercaseChar)) {
    return uppercaseChar as Letter;
  }
  return "#";
}

function sortItems<T extends Item>(items: T[]): SortableItem<T>[] {
  return items
    .map((value) => ({ value, key: value.name.trim().toUpperCase() }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

function groupItems<T extends Item>(sortedItems: SortableItem<T>[]) {
  const groups = Object.fromEntries(
    LETTERS.map((letter) => [letter, [] as SortableItem<T>[]]),
  ) as GroupedItems<T>;

  for (const value of sortedItems) {
    const letter = getLetter(value.key[0] ?? "");
    groups[letter].push(value);
  }
  return groups;
}

function filterItems<T extends Item>(
  sortedItems: SortableItem<T>[],
  search: string,
): Set<string> {
  /** Set of item keys that match the current query */
  const query = search.trim().toUpperCase();
  const visibleItems = new Set<string>();
  for (const item of sortedItems) {
    if (item.key.includes(query)) {
      visibleItems.add(item.key);
    }
  }
  return visibleItems;
}

export default function AlphabetListPage<T extends Item>({
  items,
  namePlural,
  itemComponent: Item = ListItem,
  hideItemCount,
  hideIndex,
}: AlphabetListProps<T>) {
  const [liveSearch, setSearch] = useState("");
  const search = useDeferredValue(liveSearch);
  const sortedItems = useMemo(() => sortItems(items), [items]);
  const groupedItems = useMemo(() => groupItems(sortedItems), [sortedItems]);
  const visibleItemKeys = useMemo(
    () => filterItems(sortedItems, search),
    [sortedItems, search],
  );
  const showItemCount = !hideItemCount && visibleItemKeys.size > 0;
  const capitalisedNamePlural =
    (namePlural[0]?.toUpperCase() ?? "") + (namePlural.substring(1) ?? "");
  return (
    <>
      <div className="content-scroll">
        <SearchInput onQueryChanged={(value) => setSearch(value)} />
        <div id={INITIAL_SCROLL_ID}>
          {visibleItemKeys.size === 0 && (
            <PageMessage message={items.length > 0 ? "No results" : `No ${namePlural}`} />
          )}
          {visibleItemKeys.size > 0 && (
            <ul>
              {LETTERS.map((letter) => {
                const letterItems = groupedItems[letter];
                const hasVisibleItems = letterItems.some((item) =>
                  visibleItemKeys.has(item.key),
                );
                return (
                  <li
                    id={letter}
                    key={letter}
                    className="list-section"
                    style={{ display: hasVisibleItems ? undefined : "none" }}
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
                      {letterItems.map(({ key, value }) => (
                        <Item key={key} item={value} hide={!visibleItemKeys.has(key)} />
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
          {showItemCount && (
            <div className="list-footer">
              <span className="page-msg">
                {visibleItemKeys.size} {search ? "Results" : capitalisedNamePlural}
              </span>
            </div>
          )}
        </div>
      </div>
      {!hideIndex && <AlphabetIndex />}
    </>
  );
}

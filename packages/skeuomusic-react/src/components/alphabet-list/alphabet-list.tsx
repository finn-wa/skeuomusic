import { INITIAL_SCROLL_ID } from "@/shared/constants";
import type { Item } from "@/shared/types";
import React, { useState } from "react";
import PageMessage from "../page-message/page-message";
import SearchInput from "../search-input/search-input";
import AlphabetIndex from "./alphabet-index";
import { LETTERS, LETTER_LABEL, type Letter } from "./alphabet-list-model";

type ItemRendererProps<T extends Item> = {
  item: T;
  hide?: boolean;
  href?: string;
};

export interface AlphabetListProps<T extends Item> {
  namePlural: string;
  items: T[];
  hideItemCount?: boolean;
  hideIndex?: boolean;
  itemRenderer: React.ComponentType<ItemRendererProps<T>>;
}

type SortableItem<T> = { key: string; value: T; hide?: boolean };

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
    LETTERS.map((letter) => [letter, [] as SortableItem<T>[]]),
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
  itemRenderer: Item,
  hideItemCount,
  hideIndex,
}: AlphabetListProps<T>) {
  const [search, setSearch] = useState("");
  const sortedItems: SortableItem<T>[] = items
    .map((value) => ({ value, key: value.name.trim().toUpperCase() }))
    .sort((a, b) => a.key.localeCompare(b.key));
  const itemGroups = groupItems(sortedItems);
  /** Set of item keys that match the current query */

  const query = search.trim().toUpperCase();
  const visibleItems = new Set<string>();
  for (const item of sortedItems) {
    if (item.key.includes(query)) {
      visibleItems.add(item.key);
    }
  }
  const capitalisedNamePlural =
    (namePlural[0]?.toUpperCase() ?? "") + (namePlural.substring(1) ?? "");
  return (
    <>
      <div className="content-scroll">
        <SearchInput onQueryChanged={(value) => setSearch(value)} />
        <div id={INITIAL_SCROLL_ID}>
          {visibleItems.size === 0 && (
            <PageMessage message={items.length > 0 ? "No results" : `No ${namePlural}`} />
          )}
          {visibleItems.size > 0 && (
            <ul>
              {LETTERS.map((letter) => {
                const letterItems = itemGroups[letter];
                const hasVisibleItems = letterItems.some((item) =>
                  visibleItems.has(item.key),
                );
                return (
                  <li
                    id={letter}
                    key={letter}
                    className="list-section"
                    style={{
                      display: hasVisibleItems ? undefined : "none",
                    }}
                  >
                    <div
                      className="section-header"
                      style={{
                        display: hasVisibleItems ? undefined : "none",
                      }}
                    >
                      <div className="section-header-border">
                        <span>{LETTER_LABEL[letter]}</span>
                      </div>
                    </div>
                    <ul>
                      {letterItems.map(({ key, value }) => (
                        <Item key={key} item={value} hide={!visibleItems.has(key)} />
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
          {!hideItemCount && (
            <div className="list-footer">
              <span className="page-msg">
                {visibleItems.size} {search ? "Results" : capitalisedNamePlural}
              </span>
            </div>
          )}
        </div>
      </div>
      {!hideIndex && <AlphabetIndex />}
    </>
  );
}

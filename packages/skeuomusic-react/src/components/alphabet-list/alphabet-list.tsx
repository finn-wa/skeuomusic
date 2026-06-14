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
import { LETTERS, LETTER_LABEL, type Letter } from "./alphabet-list-model";

export type AlphabetListProps<T extends ItemWithLink> = {
  items: Promise<T[]>;
  namePlural: string;
  hideItemCount?: boolean;
  hideIndex?: boolean;
  itemComponent?: ComponentType<ItemRendererProps<T>>;
};

export type ItemRendererProps<T extends ItemWithLink> = {
  item: T;
  hide?: boolean;
};

export default function AlphabetList<T extends Item>({
  items,
  namePlural,
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
        <Suspense name={namePlural + "AlphabetList"} fallback={<LoadingPage />}>
          <AlphabetListItems
            items={items}
            search={deferredSearch}
            namePlural={namePlural}
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
  namePlural,
  hideItemCount,
  itemComponent: ItemComponent = ListItem,
}: AlphabetListItemsProps<T>) {
  const query = (search ?? "").trim().toUpperCase();
  const resolvedItems = use(items);
  const sortedItems = useMemo(() => sortItems(resolvedItems), [resolvedItems]);
  const groupedItems = useMemo(() => groupItems(sortedItems), [sortedItems]);
  const visibleItemKeys = useMemo(
    () => filterItems(sortedItems, query),
    [sortedItems, query],
  );
  const showItemCount = !hideItemCount && visibleItemKeys.size > 0;
  const capitalisedNamePlural =
    (namePlural[0]?.toUpperCase() ?? "") + (namePlural.slice(1) ?? "");
  if (visibleItemKeys.size === 0) {
    return (
      <PageMessage
        message={resolvedItems.length > 0 ? "No Results" : `No ${capitalisedNamePlural}`}
      />
    );
  }
  return (
    <>
      <ul>
        {LETTERS.map((letter) => {
          const letterItems = groupedItems[letter];
          const hasVisibleItems = letterItems.some((item) =>
            visibleItemKeys.has(item.sortKey),
          );
          return (
            // We don't apply display: none to list sections even if they have no
            // visible items so that the index can still to jump to their position
            <li id={letter} key={letter} className="list-section">
              <div
                className="section-header"
                style={{ display: hasVisibleItems ? undefined : "none" }}
              >
                <div className="section-header-border">
                  <span>{LETTER_LABEL[letter]}</span>
                </div>
              </div>
              <ul>
                {letterItems.map(({ sortKey, value }) => (
                  <ItemComponent
                    key={value.id}
                    item={value}
                    hide={!visibleItemKeys.has(sortKey)}
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
            {visibleItemKeys.size} {search ? "Results" : capitalisedNamePlural}
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
  hide?: boolean;
};

type GroupedItems<T extends Item> = { [K in Letter]: SortableItem<T>[] };

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
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

function groupItems<T extends Item>(sortedItems: SortableItem<T>[]) {
  const groups = Object.fromEntries(
    LETTERS.map((letter) => [letter, [] as SortableItem<T>[]]),
  ) as GroupedItems<T>;

  for (const value of sortedItems) {
    const letter = getLetter(value.sortKey[0] ?? "");
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
    if (item.sortKey.includes(query)) {
      visibleItems.add(item.sortKey);
    }
  }
  return visibleItems;
}

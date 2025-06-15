import type { Accessor, Component, JSXElement } from "solid-js";
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

function groupItems<T extends Item>(allItems: T[]): ItemGroup<T>[] {
  const groups: ItemGroup<T>[] = [];
  let groupLetter = "";
  let groupItems: T[] = [];
  const addGroupIfPopulated = () => {
    if (groupItems.length > 0) {
      groups.push({ letter: groupLetter, items: groupItems });
    }
  };
  const sortedItems = [...allItems].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const item of sortedItems) {
    const itemLetter = item.name[0]?.toUpperCase() ?? "";
    if (itemLetter === groupLetter) {
      groupItems.push(item);
      continue;
    }
    addGroupIfPopulated();
    groupItems = [item];
    groupLetter = itemLetter;
  }
  addGroupIfPopulated();
  return groups;
}

export default function AlphabetList<T extends Item>({
  items,
  namePlural,
  hideItemCount,
  itemRenderer = (item, hide) => <ListItem name={item.name} hide={hide} />,
}: AlphabetListProps<T>) {
  const itemGroups = () => groupItems(items());

  const queryableItems = () =>
    items().map((item) => ({ ...item, title: item.name.toLowerCase() }));

  const searchSignal = createSignal("");
  const [search] = searchSignal;

  const capitalisedNamePlural =
    (namePlural[0]?.toUpperCase() ?? "") + (namePlural.substring(1) ?? "");

  /** Set of item keys that match the current query */
  const visibleItems = () => {
    const query = search().toLowerCase();
    const visible = new Set<string>();
    for (const item of queryableItems()) {
      if (item.title.includes(query)) {
        visible.add(item.id);
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
            <For each={itemGroups()}>
              {({ letter, items }) => (
                <li
                  class="alphabet-sublist"
                  style={{
                    display: items.some((item) => visibleItems().has(item.id))
                      ? undefined
                      : "none",
                  }}
                >
                  <div class="emboss-y alphabet-indicator">
                    <span>{letter}</span>
                  </div>
                  <ol>
                    <For each={items}>
                      {(item) =>
                        itemRenderer(item, () => !visibleItems().has(item.id))
                      }
                    </For>
                  </ol>
                </li>
              )}
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

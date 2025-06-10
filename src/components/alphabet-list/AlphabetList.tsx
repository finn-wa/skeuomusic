import type { Accessor } from "solid-js";
import { For, Show, createSignal } from "solid-js";
import type { Item } from "~/lib/types";
import ListItem from "../list-item/ListItem";
import PageMessage from "../page-message/PageMessage";
import SearchInput from "../search-input/SearchInput";
import styles from "./AlphabetList.module.css";
export interface AlphabetListProps {
  namePlural: string;
  items: Accessor<Item[]>;
}

type ItemGroup = {
  letter: string;
  items: Item[];
};

function groupItems(allItems: Item[]): ItemGroup[] {
  const groups: ItemGroup[] = [];
  let groupLetter = "";
  let groupItems: Item[] = [];
  const addGroupIfPopulated = () => {
    if (groupItems.length > 0) {
      groups.push({ letter: groupLetter, items: groupItems });
    }
  };
  const sortedItems = [...allItems].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const item of sortedItems) {
    const itemLetter = item.name[0] ?? "";
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

export default function AlphabetList({ items, namePlural }: AlphabetListProps) {
  const itemGroups = () => groupItems(items());

  const queryableItems = () =>
    items().map((item) => ({ ...item, title: item.name.toLowerCase() }));

  const searchSignal = createSignal("");
  const [search] = searchSignal;

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
      <div class={styles["items-container"]}>
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
                  class={styles.sublist}
                  style={{
                    display: items.some((item) => visibleItems().has(item.id))
                      ? undefined
                      : "none",
                  }}
                >
                  <div class={`emboss-y ${styles.indicator}`}>
                    <span>{letter}</span>
                  </div>
                  <ol>
                    <For each={items}>
                      {({ name, id }) => (
                        <ListItem name={name} hide={!visibleItems().has(id)} />
                      )}
                    </For>
                  </ol>
                </li>
              )}
            </For>
          </ol>
        </Show>
      </div>
    </>
  );
}

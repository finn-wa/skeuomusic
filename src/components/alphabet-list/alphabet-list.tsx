import {
  type Signal,
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { ListItem, type ListItemProps } from "../list-item/list-item";
import { SearchInput } from "../search-input/search-input";
import styles from "./alphabet-list.module.css";
export type AlphabetListItem = ListItemProps & { key: string };
export interface AlphabetListProps {
  namePlural: string;
  items: Signal<AlphabetListItem[]>;
}

type ItemGroup = {
  letter: string;
  items: AlphabetListItem[];
};

function groupItems(allItems: AlphabetListItem[]): ItemGroup[] {
  const groups: ItemGroup[] = [];
  let groupLetter = "";
  let groupItems: AlphabetListItem[] = [];
  const addGroupIfPopulated = () => {
    if (groupItems.length > 0) {
      groups.push({ letter: groupLetter, items: groupItems });
    }
  };
  for (const item of allItems) {
    const itemLetter = item.title[0] ?? "";
    if (itemLetter === groupLetter) {
      groupItems.push(item);
      continue;
    }
    addGroupIfPopulated();
    groupItems = [];
    groupLetter = itemLetter;
  }
  addGroupIfPopulated();
  return groups;
}

export const AlphabetList = component$<AlphabetListProps>((props) => {
  const { items, namePlural } = props;
  const itemGroups: Signal<ItemGroup[]> = useComputed$(() =>
    groupItems(items.value),
  );
  const queryableItems = useComputed$(() =>
    items.value.map((item) => ({ ...item, title: item.title.toLowerCase() })),
  );
  const searchQuery = useSignal<string | undefined>();
  /** Set of item keys that match the current query */
  const visibleItems = useComputed$(() => {
    const query = searchQuery.value?.trim().toLowerCase() ?? "";
    const visible = new Set<string>();
    for (const item of queryableItems.value) {
      if (item.title.includes(query)) {
        visible.add(item.key);
      }
    }
    return visible;
  });

  return (
    <>
      <SearchInput query={searchQuery} />
      <div class={styles["items-container"]}>
        {visibleItems.value.size === 0 ? (
          <div class="page-message">
            <span class="page-message-text">
              {items.value.length > 0 ? "No results" : `No ${namePlural}`}
            </span>
          </div>
        ) : (
          <ol>
            {itemGroups.value.flatMap(({ letter, items }) => (
              <li
                class={[
                  styles.sublist,
                  {
                    "d-none": items.every(
                      (item) => !visibleItems.value.has(item.key),
                    ),
                  },
                ]}
                key={`${letter}_group`}
              >
                <div class={["emboss-y", styles.indicator]}>
                  <span>{letter}</span>
                </div>
                <ol>
                  {...items.map(({ title, key }) => (
                    <ListItem
                      title={title}
                      key={key}
                      hide={!visibleItems.value.has(key)}
                    />
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
});

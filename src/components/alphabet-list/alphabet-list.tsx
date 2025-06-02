import {
  type Signal,
  component$,
  useComputed$,
  useSignal,
} from "@builder.io/qwik";
import { ListItem, type ListItemProps } from "../list-item/list-item";
import { SearchInput } from "../search-input/search-input";
import styles from "./alphabet-list.module.css";
export type AlphabetListItem = ListItemProps & { key: string };
type ProcessedListItem = AlphabetListItem & { lowerTitle: string };
export interface AlphabetListProps {
  items: Signal<AlphabetListItem[]>;
}

type ItemGroup = {
  letter: string;
  items: ProcessedListItem[];
};

function groupItems(allItems: AlphabetListItem[]): ItemGroup[] {
  const groups: ItemGroup[] = [];
  let groupLetter = "";
  let groupItems: ProcessedListItem[] = [];
  const addGroupIfPopulated = () => {
    if (groupItems.length > 0) {
      groups.push({ letter: groupLetter, items: groupItems });
    }
  };
  for (const item of allItems) {
    const itemLetter = item.title[0] ?? "";
    if (itemLetter === groupLetter) {
      groupItems.push({ ...item, lowerTitle: item.title.toLowerCase() });
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
  const itemGroups: Signal<ItemGroup[]> = useComputed$(() =>
    groupItems(props.items.value),
  );
  const searchQuery = useSignal<string | undefined>();
  const processedQuery = useComputed$(
    () => searchQuery.value?.trim().toLowerCase() ?? "",
  );

  return (
    <>
      <SearchInput query={searchQuery} />
      <ol class="list">
        {itemGroups.value.flatMap(({ letter, items }) => (
          <li
            class={[
              styles.sublist,
              {
                "d-none": items.every(
                  (item) => !item.lowerTitle.includes(processedQuery.value),
                ),
              },
            ]}
            key={`${letter}_group`}
          >
            <div class={["emboss-y", styles.indicator]}>
              <span>{letter}</span>
            </div>
            <ol>
              {...items.map(({ title, lowerTitle, key }) => (
                <ListItem
                  title={title}
                  key={key}
                  hide={!lowerTitle.includes(processedQuery.value)}
                />
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
});

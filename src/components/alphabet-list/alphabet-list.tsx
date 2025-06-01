import { type Signal, component$, useComputed$ } from "@builder.io/qwik";
import { AlphabetDivider } from "../alphabet-divider/alphabet-divider";
import { ListItem, type ListItemProps } from "../list-item/list-item";

export type AlphabetListItem = ListItemProps & { key: string };

export interface AlphabetListProps {
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
  const itemGroups: Signal<ItemGroup[]> = useComputed$(() =>
    groupItems(props.items.value),
  );
  return (
    <ul class="list">
      {itemGroups.value.flatMap(({ letter, items }) => [
        <li key={`${letter}_group`}>
          <AlphabetDivider letter={letter} />
          <ul class="sublist">
            {...items.map(({ title }) => (
              <ListItem title={title} key={title} />
            ))}
          </ul>
        </li>,
      ])}
    </ul>
  );
});

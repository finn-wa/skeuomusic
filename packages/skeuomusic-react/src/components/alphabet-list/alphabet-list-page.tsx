import type { Item } from "@/shared/types";
import type { ItemWithLink } from "../list-item/list-item";
import { AlphabetList, type ItemRendererProps } from "./alphabet-list";
import { Suspense, useDeferredValue, useState } from "react";
import { LoadingPage } from "../page-message/page-message";
import { INITIAL_SCROLL_ID } from "@/shared/constants";
import SearchInput from "../search-input/search-input";
import AlphabetIndex from "./alphabet-index";

export type AlphabetListPageProps<T extends ItemWithLink> = {
  items: Promise<T[]>;
  namePlural: string;
  hideItemCount?: boolean;
  hideIndex?: boolean;
  itemComponent?: React.ComponentType<ItemRendererProps<T>>;
};

export default function AlphabetListPage<T extends Item>({
  items,
  namePlural,
  itemComponent,
  hideItemCount,
  hideIndex,
}: AlphabetListPageProps<T>) {
  const [liveSearch, setSearch] = useState("");
  const search = useDeferredValue(liveSearch);
  return (
    <>
      <div className="content-scroll">
        <SearchInput onQueryChanged={(value) => setSearch(value)} />
        <div id={INITIAL_SCROLL_ID}></div>
        <Suspense name={namePlural + "AlphabetList"} fallback={<LoadingPage />}>
          <AlphabetList
            items={items}
            search={search}
            namePlural={namePlural}
            itemComponent={itemComponent}
            hideItemCount={hideItemCount}
          />
        </Suspense>
        ;
      </div>
      {!hideIndex && <AlphabetIndex />}
    </>
  );
}

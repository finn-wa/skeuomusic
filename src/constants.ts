import { createContextId } from "@builder.io/qwik";
import { AlphabetListItem } from "./components/alphabet-list/alphabet-list";

export type AppState = {
  albums: AlphabetListItem[];
  artists: AlphabetListItem[];
};

export const APP_STATE = createContextId<AppState>("state");

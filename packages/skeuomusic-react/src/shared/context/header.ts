import { createContext } from "react";
import { useRequiredContext } from "./utils";

export type HeaderState = {
  title: string;
  leftButton?: { label: string; href?: string };
  rightButton?:
    | { kind: "link"; label: string; href: string }
    | {
        kind: "submit";
        label: string;
        formId: string;
        disabled?: boolean;
        onClick?: () => void;
      };
};
export type HeaderContextValue = HeaderState & {
  setHeaderState: (value: HeaderState) => void;
};
export const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);
export function useHeaderContext() {
  return useRequiredContext(HeaderContext);
}

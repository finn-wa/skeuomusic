import { component$ } from "@builder.io/qwik";
import styles from "./alphabet-divider.module.css";

export interface AlphabetDividerProps {
  letter: string;
}

export const AlphabetDivider = component$<AlphabetDividerProps>((props) => {
  return <span>{props.letter}</span>;
});

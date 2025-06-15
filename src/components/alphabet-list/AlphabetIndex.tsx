import { For, createSignal } from "solid-js";
import { LETTERS, type Letter } from "./AlphabetListModel";

export type AlphabetIndexProps = {
  jumpTo: (letter: Letter) => void;
};

export default function AlphabetIndex(props: AlphabetIndexProps) {
  const [jumping, setJumping] = createSignal(false);
  //
  return (
    <nav
      class="alphabet-index"
      aria-label="List index"
      onMouseDown={() => setJumping(true)}
      onMouseLeave={() => setJumping(false)}
      onMouseUp={() => setJumping(false)}
    >
      <ul>
        <For each={LETTERS}>
          {(letter) => (
            <li
              onmouseover={() => {
                if (jumping()) {
                  props.jumpTo(letter);
                }
              }}
            >
              <a href={`#${letter}`} draggable="false">
                {letter}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}

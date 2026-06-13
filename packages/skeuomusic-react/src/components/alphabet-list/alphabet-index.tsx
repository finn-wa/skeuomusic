import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { LETTERS } from "./alphabet-list-model";

/**
 * Displays the alphabet as a column down the right-hand side of long alphabetised lists.
 * Each letter is a link to a scroll position in the list - e.g. clicking on J will
 * immediately jump to the items starting with J. The user can also click and hold, and as
 * they slide the pointer over each letter it will jump to that position.
 */
export default function AlphabetIndex() {
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const isJumping = useRef(false);
  const jumpTo = (letter: string) => navigate({ hash: letter });
  function setJumping(jumping: boolean) {
    isJumping.current = jumping;
    if (jumping) {
      navRef.current!.className = "alphabet-index jumping";
    } else {
      navRef.current!.className = "alphabet-index";
    }
  }

  return (
    <nav
      ref={navRef}
      className="alphabet-index"
      aria-label="List index"
      onPointerDown={() => setJumping(true)}
      onPointerLeave={() => setJumping(false)}
      onPointerUp={() => setJumping(false)}
    >
      <ul>
        {LETTERS.map((letter) => (
          <li
            key={letter}
            onPointerOver={async () => {
              if (isJumping.current) {
                await jumpTo(letter);
              }
            }}
          >
            <a href={`#${letter}`} draggable="false">
              {letter}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

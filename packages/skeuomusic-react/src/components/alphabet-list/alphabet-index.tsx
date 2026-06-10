import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { LETTERS } from "./alphabet-list-model";

export default function AlphabetIndex() {
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const jumpingRef = useRef(false);

  const jumpTo = (letter: string) => navigate({ hash: letter });
  function setJumping(jumping: boolean) {
    jumpingRef.current = jumping;
    if (jumping) {
      navRef.current!.className = "alphabet-index jumping";
    } else {
      navRef.current!.className = "alphabet-index";
    }
  }

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <nav
      ref={navRef}
      className="alphabet-index"
      aria-label="List index"
      onMouseDown={() => setJumping(true)}
      onMouseLeave={() => setJumping(false)}
      onMouseUp={() => setJumping(false)}
    >
      <ul>
        {LETTERS.map((letter) => (
          <li
            key={letter}
            // oxlint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={async () => {
              if (jumpingRef.current) {
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

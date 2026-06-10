export const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "#",
] as const;

export type Letter = (typeof LETTERS)[number];

export const LETTER_LABEL = {
  ...Object.fromEntries(LETTERS.slice(0, -1).map((letter) => [letter, letter])),
  "#": "123",
} as Readonly<Record<Letter, string>>;

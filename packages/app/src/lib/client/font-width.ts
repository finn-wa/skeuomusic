export function measureFont(containerEl: HTMLSpanElement) {
  const getCharWidth = (char: string) => {
    containerEl.innerText = char;
    const rawWidth = containerEl.getBoundingClientRect().width;
    return Math.round(rawWidth * 100) / 100;
  };
  const widths: { [char: string]: number } = {};
  for (let i = 33; i < 127; i++) {
    const char = String.fromCharCode(i);
    widths[char] = getCharWidth(char);
  }
  return widths;
}

type MeasuredFontChar =
  | "fallback"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "!"
  | '"'
  | "#"
  | "$"
  | "%"
  | "&"
  | "'"
  | "("
  | ")"
  | "*"
  | "+"
  | ","
  | "-"
  | "."
  | "/"
  | ":"
  | ";"
  | "<"
  | "="
  | ">"
  | "?"
  | "@"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "["
  | "\\"
  | "]"
  | "^"
  | "_"
  | "`"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "{"
  | "|"
  | "}"
  | "~";

// const
const measuredFonts = {
  interVariable16px700w: {
    fallback: 10,
    "0": 10.78,
    "1": 6.9,
    "2": 10.08,
    "3": 10.33,
    "4": 10.82,
    "5": 9.95,
    "6": 10.4,
    "7": 9.3,
    "8": 10.42,
    "9": 10.4,
    "!": 5.4,
    '"': 8.83,
    "#": 10.38,
    $: 10.48,
    "%": 16.25,
    "&": 10.75,
    "'": 5.42,
    "(": 6.03,
    ")": 6.03,
    "*": 8.95,
    "+": 10.87,
    ",": 5.35,
    "-": 7.48,
    ".": 5.35,
    "/": 6.22,
    ":": 5.35,
    ";": 5.48,
    "<": 10.87,
    "=": 10.87,
    ">": 10.87,
    "?": 8.95,
    "@": 16.27,
    A: 11.95,
    B: 10.58,
    C: 11.83,
    D: 11.55,
    E: 9.72,
    F: 9.4,
    G: 12.02,
    H: 11.95,
    I: 4.5,
    J: 9.35,
    K: 11.52,
    L: 9.05,
    M: 14.92,
    N: 12.2,
    O: 12.33,
    P: 10.37,
    Q: 12.43,
    R: 10.52,
    S: 10.48,
    T: 10.68,
    U: 11.72,
    V: 11.95,
    W: 16.6,
    X: 11.82,
    Y: 11.7,
    Z: 10.63,
    "[": 6.03,
    "\\": 6.22,
    "]": 6.03,
    "^": 7.78,
    _: 7.62,
    "`": 5.85,
    a: 9.28,
    b: 10.08,
    c: 9.42,
    d: 10.08,
    e: 9.53,
    f: 6.37,
    g: 10.12,
    h: 9.97,
    i: 4.33,
    j: 4.33,
    k: 9.28,
    l: 4.33,
    m: 14.6,
    n: 9.97,
    o: 9.82,
    p: 10.08,
    q: 10.08,
    r: 6.52,
    s: 8.97,
    t: 5.87,
    u: 9.97,
    v: 9.6,
    w: 13.6,
    x: 9.28,
    y: 9.63,
    z: 9.17,
    "{": 7.5,
    "|": 5.95,
    "}": 7.5,
    "~": 10.87,
  },
} satisfies Record<string, Record<MeasuredFontChar, number>>;

export function estimateTextWidth(
  fontKey: keyof typeof measuredFonts,
  text: string,
): number {
  let width = 0;
  const font = measuredFonts[fontKey];
  for (const char of text) {
    if (char in font) {
      width += font[char as MeasuredFontChar] ?? font.fallback;
    }
  }
  return Math.ceil(width);
}

export type Noun =
  | string
  | {
      singular: string;
      plural: string;
    };

export function plural(noun: Noun, count?: number) {
  if (count === 1) {
    return singular(noun);
  }
  return typeof noun === "string" ? noun + "s" : noun.plural;
}

export function singular(noun: Noun) {
  return typeof noun === "string" ? noun : noun.singular;
}

import type { Cachable } from "./types";

export interface CachingStrategy {
  getOrCreate<T>(
    cacheKey: string,
    createFunction: () => Promise<T & Cachable & object>,
    updateFunction?: (item: T) => Promise<T & Cachable & object>,
  ): Promise<T & Cachable>;

  get<T>(cacheKey: string): Promise<(T & Cachable) | null>;
  setCacheItem<T>(cacheKey: string, item: T & Cachable): void;
  remove(cacheKey: string): void;
}

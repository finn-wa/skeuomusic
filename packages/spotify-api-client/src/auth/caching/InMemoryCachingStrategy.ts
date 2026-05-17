import GenericCache from "./GenericCache.js";
import type { AutoRenewConfig, CacheStore } from "./types.js";

export default class InMemoryCachingStrategy extends GenericCache {
  constructor(autoRenewConfig?: AutoRenewConfig) {
    super(
      new DictionaryCacheStore(),
      undefined,
      autoRenewConfig?.interval,
      autoRenewConfig?.expiryWindow,
    );
  }
}

class DictionaryCacheStore implements CacheStore {
  private cache = new Map<string, string>();

  public get(key: string): string | null {
    return this.cache.get(key) ?? null;
  }

  public set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  public remove(key: string): void {
    this.cache.delete(key);
  }
}

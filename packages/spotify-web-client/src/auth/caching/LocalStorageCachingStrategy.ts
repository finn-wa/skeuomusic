import GenericCache from "./GenericCache.js";
import type { AutoRenewConfig, CacheStore } from "./types.js";

export default class LocalStorageCachingStrategy extends GenericCache {
  constructor(autoRenewConfig?: AutoRenewConfig) {
    super(
      new LocalStorageCacheStore(),
      undefined,
      autoRenewConfig?.interval,
      autoRenewConfig?.expiryWindow,
    );
  }
}

class LocalStorageCacheStore implements CacheStore {
  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}

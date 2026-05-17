import { isEmptyAccessToken } from "../token/AccessToken.js";
import type { CachingStrategy } from "./CachingStrategy.js";
import type { Cachable, CacheStore } from "./types.js";

export default class GenericCache implements CachingStrategy {
  private readonly updateListeners: {
    [key: string]: ((value: any) => void)[];
  } = {};

  constructor(
    private storage: CacheStore,
    private updateFunctions: Map<
      string,
      (item: any) => Promise<Cachable>
    > = new Map(),
    private autoRenewInterval: number = 0,
    private autoRenewWindow: number = 2 * 60 * 1000, // Two minutes
  ) {
    if (this.autoRenewInterval > 0) {
      setInterval(() => this.autoRenewRenewableItems(), this.autoRenewInterval);
    }
  }

  /**
   * Add a callback that will be invoked each time a cache item is set or
   * removed. Listeners will not be called for cache items that expire on
   * access.
   */
  public addUpdateListener<T>(
    cacheKey: string,
    listener: (value: T | null) => void,
  ): void {
    const existingListeners = this.updateListeners[cacheKey];
    if (existingListeners == null) {
      this.updateListeners[cacheKey] = [listener];
      return;
    }
    if (!existingListeners.includes(listener)) {
      existingListeners.push(listener);
    }
  }

  public removeUpdateListener<T>(
    cacheKey: string,
    listener: (value: T | null) => void,
  ): void {
    const listeners = this.updateListeners[cacheKey];
    if (listeners == null || listeners.length === 0) {
      return;
    }
    this.updateListeners[cacheKey] = listeners.filter((x) => x !== listener);
  }

  public async getOrCreate<T>(
    cacheKey: string,
    createFunction: () => Promise<T & Cachable & object>,
    updateFunction?: (item: T) => Promise<T & Cachable & object>,
  ): Promise<T & Cachable> {
    if (updateFunction) {
      this.updateFunctions.set(cacheKey, updateFunction);
    }

    const item = await this.get<T>(cacheKey);
    if (item) {
      return item;
    }

    const newCacheItem = await createFunction();
    if (!newCacheItem) {
      throw new Error("Could not create cache item");
    }

    if (!isEmptyAccessToken(newCacheItem)) {
      this.setCacheItem(cacheKey, newCacheItem);
    }

    return newCacheItem;
  }

  public async get<T>(cacheKey: string): Promise<(T & Cachable) | null> {
    let asString = this.storage.get(cacheKey);
    let cachedItem: T & Cachable = asString ? JSON.parse(asString) : null;

    if (
      this.itemDueToExpire(cachedItem) &&
      this.updateFunctions.has(cacheKey)
    ) {
      const updateFunction = this.updateFunctions.get(cacheKey);
      await this.tryUpdateItem(cacheKey, cachedItem, updateFunction!);

      // Ensure updated item is returned
      asString = this.storage.get(cacheKey);
      cachedItem = asString ? JSON.parse(asString) : null;
    }

    if (!cachedItem) {
      return null;
    }

    if (
      cachedItem.expires &&
      (cachedItem.expires === -1 || cachedItem.expires <= Date.now())
    ) {
      this.remove(cacheKey);
      return null;
    }

    if (cachedItem.expiresOnAccess && cachedItem.expiresOnAccess === true) {
      this.remove(cacheKey);
      return cachedItem;
    }

    return cachedItem;
  }

  public set(cacheKey: string, value: object, expiresIn: number): void {
    const expires = Date.now() + expiresIn;
    const cacheItem: Cachable = { ...value, expires };
    this.setCacheItem(cacheKey, cacheItem);
  }

  public setCacheItem(cacheKey: string, cacheItem: Cachable): void {
    const asString = JSON.stringify(cacheItem);
    this.storage.set(cacheKey, asString);
    if (cacheItem.expiresOnAccess === true) {
      return;
    }
    const listeners = this.updateListeners[cacheKey];
    if (listeners != null) {
      for (const listener of listeners) {
        listener(cacheItem);
      }
    }
  }

  public remove(cacheKey: string): void {
    this.storage.remove(cacheKey);
    const listeners = this.updateListeners[cacheKey];
    if (listeners != null) {
      for (const listener of listeners) {
        listener(null);
      }
    }
  }

  private itemDueToExpire(item: Cachable): boolean {
    if (!item) {
      return false;
    }

    if (!item.expires) {
      return false;
    }

    return item.expires - Date.now() < this.autoRenewWindow;
  }

  private async autoRenewRenewableItems() {
    this.updateFunctions.forEach(async (updateFunction, key) => {
      const cachedItem = await this.get(key);
      if (!cachedItem) {
        return;
      }

      if (updateFunction && this.itemDueToExpire(cachedItem)) {
        await this.tryUpdateItem(key, cachedItem, updateFunction);
      }
    });
  }

  private async tryUpdateItem(
    key: string,
    cachedItem: Cachable,
    updateFunction: (item: Cachable) => Promise<Cachable>,
  ) {
    try {
      const updated = await updateFunction(cachedItem);
      if (updated) {
        this.setCacheItem(key, updated);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

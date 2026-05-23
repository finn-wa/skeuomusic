export interface Cachable {
  expires?: number;
  expiresOnAccess?: boolean;
}

export interface CacheStore {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

export type AutoRenewConfig = {
  /**
   * How frequently to check for expiring items in milliseconds. If set to zero
   * or undefined (the default), tokens will not be auto-renewed.
   */
  interval: number;
  /**
   * Maximum remaining token lifespan to consider "expiring soon" when
   * auto-renew is enabled.
   */
  expiryWindow: number;
};

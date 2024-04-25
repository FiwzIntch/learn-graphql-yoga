export interface CacheStore<T> {
  get(key: string): T | undefined
  set(key: string, value: T): void
}
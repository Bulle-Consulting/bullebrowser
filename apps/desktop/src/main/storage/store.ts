// Lazy electron-store factory. We instantiate per-feature stores so they
// can be cleared / migrated independently.

import Store from 'electron-store';

export function createStore<T extends Record<string, unknown>>(name: string, defaults: T) {
  return new Store<T>({ name, defaults });
}

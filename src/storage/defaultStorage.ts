import type { SanctumStorageAdapter } from '../types';

class MemoryStorageAdapter implements SanctumStorageAdapter {
  private data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }
}

const memoryFallback = new MemoryStorageAdapter();

export const createBrowserStorageAdapter = (storage: Storage): SanctumStorageAdapter => ({
  getItem: (key) => storage.getItem(key),
  setItem: (key, value) => storage.setItem(key, value),
  removeItem: (key) => storage.removeItem(key)
});

export const getDefaultStorageAdapter = (): SanctumStorageAdapter => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return createBrowserStorageAdapter(window.localStorage);
  }
  return memoryFallback;
};

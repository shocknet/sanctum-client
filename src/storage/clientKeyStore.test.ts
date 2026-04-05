import { describe, expect, it, vi } from 'vitest';
import { ClientKeyStore } from './clientKeyStore';

const memoryStorage = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k)
  };
};

describe('ClientKeyStore', () => {
  it('generates and persists when getClientKey hook is omitted', async () => {
    const storage = memoryStorage();
    const store = new ClientKeyStore(storage);
    const a = await store.getClientKey();
    const b = await store.getClientKey();
    expect(a).toBe(b);
    expect(a.length).toBe(8);
  });

  it('uses config hook when provided and caches the result', async () => {
    const hook = vi.fn(() => 'capacitor-device-id');
    const store = new ClientKeyStore(memoryStorage(), hook);
    expect(await store.getClientKey()).toBe('capacitor-device-id');
    expect(await store.getClientKey()).toBe('capacitor-device-id');
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it('throws when hook returns empty string', async () => {
    const store = new ClientKeyStore(memoryStorage(), () => '');
    await expect(store.getClientKey()).rejects.toThrow(/non-empty string/);
  });
});

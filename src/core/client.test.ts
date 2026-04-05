import { describe, expect, it } from 'vitest';
import { createSanctumSDK } from './client';

describe('createSanctumSDK', () => {
  it('creates isolated instance and clears token state on destroy', async () => {
    const store = new Map<string, string>();
    const client = createSanctumSDK({
      url: 'https://auth.example.com',
      storageAdapter: {
        getItem: (key) => store.get(key) ?? null,
        setItem: (key, value) => void store.set(key, value),
        removeItem: (key) => void store.delete(key)
      }
    });
    await client.init();
    await client.api.clearTokens();
    await client.destroy();
    expect(await client.session.getTokenData()).toBeNull();
  });
});

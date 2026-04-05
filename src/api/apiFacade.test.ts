import { describe, expect, it, vi } from 'vitest';
import { ApiFacade } from './apiFacade';
import { TypedEventBus } from '../core/events';
import { SessionManager } from '../session/sessionManager';
import { ClientKeyStore } from '../storage/clientKeyStore';
import type { TokensData } from '../types';

const now = Date.now();
const tokenFixture: TokensData = {
  identifier: 'id-1',
  access_token: 'old-access',
  refresh_token: 'refresh-1',
  expires_at: now + 100_000,
  refresh_expires_at: now + 200_000,
  account_identifier: 'demo'
};

const createHarness = () => {
  let token: TokensData | null = { ...tokenFixture };
  const adapter = {
    getTokenData: vi.fn(async () => token),
    setTokenData: vi.fn(async (data: TokensData) => { token = data; }),
    clearTokenData: vi.fn(async () => { token = null; })
  };
  const events = new TypedEventBus();
  const session = new SessionManager(adapter, events);
  const storage = new Map<string, string>();
  const clientKeyStore = new ClientKeyStore({
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => void storage.set(key, value),
    removeItem: (key) => void storage.delete(key)
  });
  return { adapter, events, session, clientKeyStore, getToken: () => token };
};

describe('ApiFacade', () => {
  it('refreshes once and retries failed auth call', async () => {
    const h = createHarness();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'ERROR', reason: 'ACCESS_TOKEN_INVALID' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'OK',
          identifier: 'id-1',
          account_identifier: 'demo',
          access_token: 'new-access',
          refresh_token: 'new-refresh',
          expires_at: now + 500_000,
          refresh_expires_at: now + 700_000
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'OK', pubkey: 'pubkey-123' })
      });
    vi.stubGlobal('fetch', fetchMock);

    const api = new ApiFacade({
      baseUrl: 'http://example.test',
      session: h.session,
      events: h.events,
      clientKeyStore: h.clientKeyStore
    });

    const result = await api.getPublicKey();
    expect(result).toBe('pubkey-123');
    expect(h.getToken()?.access_token).toBe('new-access');
    expect(fetchMock).toHaveBeenCalledTimes(3);
    vi.unstubAllGlobals();
  });

  it('forces reauth on grant revoked from protected call', async () => {
    const h = createHarness();
    const reauthSpy = vi.fn();
    h.events.on('reauthRequired', reauthSpy);

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ERROR', reason: 'GRANT_REVOKED' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const api = new ApiFacade({
      baseUrl: 'http://example.test',
      session: h.session,
      events: h.events,
      clientKeyStore: h.clientKeyStore
    });

    await expect(api.getPublicKey()).rejects.toMatchObject({ code: 'GRANT_REVOKED' });
    expect(reauthSpy).toHaveBeenCalledWith({ reason: 'GRANT_REVOKED' });
    expect(h.getToken()).toBeNull();
    vi.unstubAllGlobals();
  });
});

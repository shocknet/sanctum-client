import { describe, expect, it, vi } from 'vitest';
import { SessionManager } from './sessionManager';
import { TypedEventBus } from '../core/events';
import type { TokensData } from '../types';

describe('SessionManager', () => {
  it('emits token and auth state events on set and clear', async () => {
    let token: TokensData | null = null;
    const adapter = {
      getTokenData: vi.fn(async () => token),
      setTokenData: vi.fn(async (data: TokensData) => { token = data; }),
      clearTokenData: vi.fn(async () => { token = null; })
    };
    const events = new TypedEventBus();
    const manager = new SessionManager(adapter, events);
    const tokenChange = vi.fn();
    const authState = vi.fn();
    events.on('tokenChange', tokenChange);
    events.on('authStateChanged', authState);

    await manager.setTokenData({
      identifier: 'id-1',
      account_identifier: 'demo',
      access_token: 'a',
      refresh_token: 'b',
      expires_at: Date.now() + 1000,
      refresh_expires_at: Date.now() + 10000
    });
    await manager.clear();

    expect(tokenChange).toHaveBeenCalledTimes(2);
    expect(authState).toHaveBeenCalledWith('authenticated');
    expect(authState).toHaveBeenCalledWith('idle');
  });
});

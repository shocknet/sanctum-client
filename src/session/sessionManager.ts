import type { TokenDataAdapter, TokensData } from '../types';
import { TypedEventBus } from '../core/events';



export class SessionManager {
  constructor(
    private tokenDataAdapter: TokenDataAdapter,
    private events: TypedEventBus
  ) {}

  async getTokenData(): Promise<TokensData | null> {
    return Promise.resolve(this.tokenDataAdapter.getTokenData());
  }

  async setTokenData(tokensData: TokensData): Promise<void> {
    await Promise.resolve(this.tokenDataAdapter.setTokenData(tokensData));
    this.events.emit('tokenChange', tokensData);
    this.events.emit('tokensUpdated', tokensData);
    this.events.emit('authStateChanged', 'authenticated');
  }

  async clear(): Promise<void> {
    await Promise.resolve(this.tokenDataAdapter.clearTokenData());
    this.events.emit('tokenChange', null);
    this.events.emit('authStateChanged', 'idle');
  }

  async updateTokensAfterRefresh(tokensData: TokensData): Promise<void> {
    await Promise.resolve(this.tokenDataAdapter.setTokenData(tokensData));
    this.events.emit('tokenChange', tokensData);
    this.events.emit('tokensUpdated', tokensData);
  }
}

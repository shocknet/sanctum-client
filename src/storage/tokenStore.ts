import type { SanctumStorageAdapter, TokenDataAdapter, TokensData } from '../types';

export const TOKEN_STORAGE_KEY = 'sanctum_sdk_tokens_data';

export const createStorageTokenDataAdapter = (storageAdapter: SanctumStorageAdapter): TokenDataAdapter => {
  return {
    async getTokenData(): Promise<TokensData | null> {
      const raw = await storageAdapter.getItem(TOKEN_STORAGE_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as TokensData;
      } catch {
        return null;
      }
    },
    async setTokenData(tokensData: TokensData): Promise<void> {
      await storageAdapter.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokensData));
    },
    async clearTokenData(): Promise<void> {
      await storageAdapter.removeItem(TOKEN_STORAGE_KEY);
    }
  };
};

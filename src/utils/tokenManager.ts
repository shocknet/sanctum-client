export interface TokenData {
  accessToken: string;
  identifier: string;
}

export class TokenManager {
  private static instance: TokenManager;
  static readonly STORAGE_KEY = 'sanctum_access_token';

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public setToken(accessToken: string, identifier: string): void {
    try {
      const data: TokenData = { accessToken, identifier };
      localStorage.setItem(TokenManager.STORAGE_KEY, JSON.stringify(data));
      // Dispatch storage event for same-tab notifications
      window.dispatchEvent(new StorageEvent('storage', {
        key: TokenManager.STORAGE_KEY,
        newValue: JSON.stringify(data)
      }));
    } catch (error) {
      console.error('Failed to save token data to localStorage:', error);
    }
  }

  public getToken(): TokenData | null {
    try {
      const data = localStorage.getItem(TokenManager.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to parse token data from localStorage:', error);
      return null;
    }
  }

  public clearToken(): void {
    try {
      localStorage.removeItem(TokenManager.STORAGE_KEY);
      // Dispatch storage event for same-tab notifications
      window.dispatchEvent(new StorageEvent('storage', {
        key: TokenManager.STORAGE_KEY,
        newValue: null
      }));
    } catch (error) {
      console.error('Failed to remove token data from localStorage:', error);
    }
  }
} 
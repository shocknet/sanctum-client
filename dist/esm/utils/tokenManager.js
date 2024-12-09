class TokenManager {
    static instance;
    static STORAGE_KEY = 'sanctum_access_token';
    constructor() { }
    static getInstance() {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }
    setToken(accessToken, accountIdentifier) {
        try {
            const data = { accessToken, accountIdentifier };
            localStorage.setItem(TokenManager.STORAGE_KEY, JSON.stringify(data));
            // Dispatch storage event for same-tab notifications
            window.dispatchEvent(new StorageEvent('storage', {
                key: TokenManager.STORAGE_KEY,
                newValue: JSON.stringify(data)
            }));
        }
        catch (error) {
            console.error('Failed to save token data to localStorage:', error);
        }
    }
    getToken() {
        try {
            const data = localStorage.getItem(TokenManager.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            console.error('Failed to parse token data from localStorage:', error);
            return null;
        }
    }
    clearToken() {
        try {
            localStorage.removeItem(TokenManager.STORAGE_KEY);
            // Dispatch storage event for same-tab notifications
            window.dispatchEvent(new StorageEvent('storage', {
                key: TokenManager.STORAGE_KEY,
                newValue: null
            }));
        }
        catch (error) {
            console.error('Failed to remove token data from localStorage:', error);
        }
    }
}

export { TokenManager };
//# sourceMappingURL=tokenManager.js.map

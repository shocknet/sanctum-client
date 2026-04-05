const TOKEN_STORAGE_KEY = 'sanctum_sdk_tokens_data';
const createStorageTokenDataAdapter = (storageAdapter) => {
    return {
        async getTokenData() {
            const raw = await storageAdapter.getItem(TOKEN_STORAGE_KEY);
            if (!raw)
                return null;
            try {
                return JSON.parse(raw);
            }
            catch {
                return null;
            }
        },
        async setTokenData(tokensData) {
            await storageAdapter.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokensData));
        },
        async clearTokenData() {
            await storageAdapter.removeItem(TOKEN_STORAGE_KEY);
        }
    };
};

export { TOKEN_STORAGE_KEY, createStorageTokenDataAdapter };
//# sourceMappingURL=tokenStore.js.map

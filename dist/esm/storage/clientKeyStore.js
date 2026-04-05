const CLIENT_KEY_STORAGE_KEY = 'sanctum_sdk_client_key';
const KEY_LENGTH = 8;
const generateClientKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let out = '';
    for (let i = 0; i < KEY_LENGTH; i += 1) {
        out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
};
class ClientKeyStore {
    constructor(storageAdapter, getClientKeyFromConfig) {
        this.storageAdapter = storageAdapter;
        this.getClientKeyFromConfig = getClientKeyFromConfig;
        this.cachedHookKey = null;
    }
    async getClientKey() {
        if (this.getClientKeyFromConfig) {
            if (this.cachedHookKey !== null) {
                return this.cachedHookKey;
            }
            const key = await Promise.resolve(this.getClientKeyFromConfig());
            if (typeof key !== 'string' || key.length === 0) {
                throw new Error('getClientKey() must return a non-empty string');
            }
            this.cachedHookKey = key;
            return key;
        }
        let key = await this.storageAdapter.getItem(CLIENT_KEY_STORAGE_KEY);
        if (!key) {
            key = generateClientKey();
            await this.storageAdapter.setItem(CLIENT_KEY_STORAGE_KEY, key);
        }
        return key;
    }
}

export { ClientKeyStore };
//# sourceMappingURL=clientKeyStore.js.map

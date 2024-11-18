class ClientKeyManager {
    static instance;
    static STORAGE_KEY = 'sanctum_client_key';
    static KEY_LENGTH = 8;
    constructor() { }
    static getInstance() {
        if (!ClientKeyManager.instance) {
            ClientKeyManager.instance = new ClientKeyManager();
        }
        return ClientKeyManager.instance;
    }
    getClientKey() {
        let clientKey = localStorage.getItem(ClientKeyManager.STORAGE_KEY);
        if (!clientKey) {
            clientKey = this.generateClientKey();
            this.setClientKey(clientKey);
        }
        return clientKey;
    }
    setClientKey(clientKey) {
        try {
            localStorage.setItem(ClientKeyManager.STORAGE_KEY, clientKey);
        }
        catch (error) {
            console.error('Failed to save client key to localStorage:', error);
        }
    }
    generateClientKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < ClientKeyManager.KEY_LENGTH; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export { ClientKeyManager };
//# sourceMappingURL=clientKeyManager.js.map

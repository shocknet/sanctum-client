class MemoryStorageAdapter {
    constructor() {
        this.data = new Map();
    }
    getItem(key) {
        return this.data.get(key) ?? null;
    }
    setItem(key, value) {
        this.data.set(key, value);
    }
    removeItem(key) {
        this.data.delete(key);
    }
}
const memoryFallback = new MemoryStorageAdapter();
const createBrowserStorageAdapter = (storage) => ({
    getItem: (key) => storage.getItem(key),
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => storage.removeItem(key)
});
const getDefaultStorageAdapter = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return createBrowserStorageAdapter(window.localStorage);
    }
    return memoryFallback;
};

export { createBrowserStorageAdapter, getDefaultStorageAdapter };
//# sourceMappingURL=defaultStorage.js.map

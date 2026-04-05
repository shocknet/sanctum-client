import type { SanctumStorageAdapter } from '../types';
export declare const createBrowserStorageAdapter: (storage: Storage) => SanctumStorageAdapter;
export declare const getDefaultStorageAdapter: () => SanctumStorageAdapter;

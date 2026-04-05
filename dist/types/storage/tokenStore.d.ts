import type { SanctumStorageAdapter, TokenDataAdapter } from '../types';
export declare const TOKEN_STORAGE_KEY = "sanctum_sdk_tokens_data";
export declare const createStorageTokenDataAdapter: (storageAdapter: SanctumStorageAdapter) => TokenDataAdapter;

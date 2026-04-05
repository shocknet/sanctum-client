import type { MaybePromise, SanctumStorageAdapter } from '../types';
export declare class ClientKeyStore {
    private readonly storageAdapter;
    private readonly getClientKeyFromConfig?;
    private cachedHookKey;
    constructor(storageAdapter: SanctumStorageAdapter, getClientKeyFromConfig?: (() => MaybePromise<string>) | undefined);
    getClientKey(): Promise<string>;
}

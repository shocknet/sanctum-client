export declare class ClientKeyManager {
    private static instance;
    private static readonly STORAGE_KEY;
    private static readonly KEY_LENGTH;
    private constructor();
    static getInstance(): ClientKeyManager;
    getClientKey(): string;
    private setClientKey;
    private generateClientKey;
}

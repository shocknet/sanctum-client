export interface TokenData {
    accessToken: string;
    accountIdentifier: string;
}
export declare class TokenManager {
    private static instance;
    static readonly STORAGE_KEY = "sanctum_access_token";
    private constructor();
    static getInstance(): TokenManager;
    setToken(accessToken: string, accountIdentifier: string): void;
    getToken(): TokenData | null;
    clearToken(): void;
}

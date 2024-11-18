export interface TokenData {
    accessToken: string;
    identifier: string;
}
export declare class TokenManager {
    private static instance;
    static readonly STORAGE_KEY = "sanctum_access_token";
    private constructor();
    static getInstance(): TokenManager;
    setToken(accessToken: string, identifier: string): void;
    getToken(): TokenData | null;
    clearToken(): void;
}

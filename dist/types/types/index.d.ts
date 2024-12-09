export interface WidgetOptions {
    onSuccess?: (token: string, identifier: string | null) => void;
    onError?: (error: string) => void;
}
type SessionExpiredHandler = (clearToken: () => void, redirectToReLogin: () => void) => void;
export interface SanctumAPIConfig {
    onSessionExpired: SessionExpiredHandler;
}
export {};

export interface WidgetOptions {
    onSuccess?: (token: string, identifier: string | null) => void;
    onError?: (error: string) => void;
}
export type SessionExpiredHandler = (clearToken: () => void, redirectToReLogin: () => void) => void;
export type InvalidTokenHanlder = (clearToken: () => void) => void;
export interface SanctumAPIConfig {
    onSessionExpired: SessionExpiredHandler;
    onInvalidToken: InvalidTokenHanlder;
}

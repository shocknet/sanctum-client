export interface WidgetOptions {
    onSuccess?: (token: string, identifier: string | null) => void;
    onError?: (error: string) => void;
}
export interface SanctumAPIConfig {
    sessionExpiredAction: 'redirect' | 'clear';
}

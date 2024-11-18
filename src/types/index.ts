export interface WidgetOptions {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
}

export interface SanctumAPIConfig {
  sessionExpiredAction: 'redirect' | 'clear';
}

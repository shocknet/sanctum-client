import type { TokensData as ProtoTokensData } from '../proto/types';

export type MaybePromise<T> = T | Promise<T>;

export type WidgetTheme = 'system' | 'dark' | 'light';
export type AuthState = 'idle' | 'connecting' | 'awaiting_confirmation' | 'authenticated' | 'error' | 'reconnecting';

export type TokensData = ProtoTokensData;

export interface SanctumStorageAdapter {
  getItem(key: string): MaybePromise<string | null>;
  setItem(key: string, value: string): MaybePromise<void>;
  removeItem(key: string): MaybePromise<void>;
}

export interface TokenDataAdapter {
  getTokenData(): MaybePromise<TokensData | null>;
  setTokenData(tokensData: TokensData): MaybePromise<void>;
  clearTokenData(): MaybePromise<void>;
}

export interface SanctumSDKConfig {
  url: string;
  websocketUrl?: string;
  storageAdapter?: SanctumStorageAdapter;
  tokenDataAdapter?: TokenDataAdapter;
  /**
   * When set, used as the Sanctum client key (e.g. Capacitor / device id). When omitted, an 8-character key is generated once and persisted via `storageAdapter`.
   */
  getClientKey?: () => MaybePromise<string>;
}

export interface SanctumSdkErrorShape {
  code: string;
  recoverable: boolean;
}

export type ReauthContext = { reason: string };

export interface SanctumApi {
  getPublicKey(): Promise<string>;
  getRelays(): Promise<Record<string, { read: boolean; write: boolean }>>;
  signEvent(event: string): Promise<string>;
  encrypt(plaintext: string, pubkey: string): Promise<string>;
  decrypt(ciphertext: string, pubkey: string): Promise<string>;
  createAuthHeader(url: string, method: string, body?: string): Promise<string>;
  getTokenData(): Promise<TokensData | null>;
  clearTokens(): Promise<void>;
}

export interface WidgetMountOptions {
  containerId: string;
  theme?: WidgetTheme;
  openAuthWindow?: (url: string) => Window | null;
  /** When `true` (default), show Log out in the authenticated state. Set `false` to hide it (e.g. app manages sign-out elsewhere). */
  showLogoutButton?: boolean;
}

export interface SanctumWidgetApi {
  mount(options: WidgetMountOptions): void;
  unmount(): void;
  setTheme(theme: WidgetTheme): void;
}

export interface SessionApi {
  getTokenData(): Promise<TokensData | null>;
  clear(): Promise<void>;
}

export interface SanctumSDKEvents {
  onTokensUpdated(handler: (tokens: TokensData) => void): () => void;
  onTokenChange(handler: (tokens: TokensData | null) => void): () => void;
  onReauthRequired(handler: (context: ReauthContext) => void): () => void;
  onAuthStateChanged(handler: (state: AuthState) => void): () => void;
}

export interface SanctumSDK {
  api: SanctumApi;
  widget: SanctumWidgetApi;
  session: SessionApi;
  events: SanctumSDKEvents;
  init(): Promise<void>;
  destroy(): Promise<void>;
}

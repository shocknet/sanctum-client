import type { TokensData } from '../types';
import {
  SocketAuthRequestTokenValidate,
  SocketErrorMessageValidate,
  TokensDataValidate,
  type SocketAuthRequestToken,
  type SocketClientHello,
  type SocketErrorMessage
} from '../proto/types';

export type AuthSocketState = 'connecting' | 'reconnecting' | 'connected';

export type AuthSocketOptions = {
  url: string;
  getClientKey: () => Promise<string>;
  onState?: (state: AuthSocketState) => void;
  onRequestToken?: (message: SocketAuthRequestToken) => void;
  onError?: (message: string) => void;
  connectTimeoutMs?: number;
  maxReconnectAttempts?: number;
  reconnectBackoff?: number[];
};

export const AUTH_SOCKET_CANCELLED_MESSAGE = 'cancelled by user';

const DEFAULT_CONNECT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_RECONNECT_ATTEMPTS = 5;
const DEFAULT_RECONNECT_BACKOFF_MS = [10_000, 10_000, 10_000, 20_000, 20_000, 30_000, 60_000];
const SOCKET_PROTOCOL_VERSION = 1;

export class AuthSocketClient {
  private readonly url: string;
  private readonly getClientKey: () => Promise<string>;
  private readonly onState?: (state: AuthSocketState) => void;
  private readonly onRequestToken?: (message: SocketAuthRequestToken) => void;
  private readonly onError?: (message: string) => void;
  private readonly connectTimeoutMs: number;
  private readonly maxReconnectAttempts: number;

  public reconnectBackoff: number[];

  private socket: WebSocket | null = null;
  private socketPromise: Promise<TokensData> | undefined;
  private resolveStart: ((tokens: TokensData) => void) | null = null;
  private rejectStart: ((error: Error) => void) | null = null;
  private connectTimeoutTimer: number | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private aborted = false;
  /** Last request_token from the server; sent on hello after reconnect so the backend can resume. */
  private lastRequestToken: string | null = null;

  constructor(options: AuthSocketOptions) {
    this.url = options.url;
    this.getClientKey = options.getClientKey;
    this.onState = options.onState;
    this.onRequestToken = options.onRequestToken;
    this.onError = options.onError;
    this.connectTimeoutMs = options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
    this.maxReconnectAttempts = options.maxReconnectAttempts ?? DEFAULT_MAX_RECONNECT_ATTEMPTS;
    this.reconnectBackoff = options.reconnectBackoff ?? [...DEFAULT_RECONNECT_BACKOFF_MS];
  }

  start(): Promise<TokensData> {
    if (this.socketPromise) return this.socketPromise;
    this.aborted = false;
    this.reconnectAttempts = 0;
    this.lastRequestToken = null;

    this.socketPromise = new Promise<TokensData>((resolve, reject) => {
      this.resolveStart = resolve;
      this.rejectStart = reject;
      this.openSocket();
    }).finally(() => {
      this.socketPromise = undefined;
      this.resolveStart = null;
      this.rejectStart = null;
      this.clearTimers();
    });

    return this.socketPromise;
  }

  abort(): void {
    if (this.aborted) return;
    this.aborted = true;
    this.lastRequestToken = null;
    this.clearTimers();
    this.cleanupSocket();
    const reject = this.rejectStart;
    this.rejectStart = null;
    this.resolveStart = null;
    reject?.(new Error(AUTH_SOCKET_CANCELLED_MESSAGE));
  }

  private openSocket(): void {
    if (this.aborted || !this.resolveStart) return;

    this.clearConnectTimeout();
    this.cleanupSocket();

    this.onState?.(this.reconnectAttempts > 0 ? 'reconnecting' : 'connecting');

    let ws: WebSocket;
    try {
      ws = new WebSocket(this.url);
    } catch {
      this.terminalReject(new Error('Failed to create WebSocket'));
      return;
    }

    this.socket = ws;

    this.connectTimeoutTimer = window.setTimeout(() => {
      if (this.aborted) return;
      this.onError?.('Connection timed out');
      try {
        ws.close();
      } catch {
        /* noop */
      }
    }, this.connectTimeoutMs);

    ws.onopen = () => {
      if (this.aborted) return;
      this.clearConnectTimeout();
      this.reconnectAttempts = 0;
      this.onState?.('connected');
      void this.sendClientHello();
    };

    ws.onmessage = (event) => {
      if (this.aborted) return;
      const parsed = this.parseMessage(event.data);
      if (!parsed) {
        this.terminalReject(new Error('Failed to parse websocket response'));
        return;
      }
      if ('request_token' in parsed) {
        this.lastRequestToken = parsed.request_token;
        this.onRequestToken?.(parsed);
        return;
      }
      if ('access_token' in parsed && 'refresh_token' in parsed) {
        this.lastRequestToken = null;
        const resolve = this.resolveStart;
        this.cleanupSocket();
        resolve?.(parsed);
        return;
      }
      if ('error' in parsed) {
        this.terminalReject(new Error(parsed.error || 'Socket auth failed'));
      }
    };

    ws.onerror = () => {};

    ws.onclose = () => {
      this.clearConnectTimeout();
      if (this.aborted) return;


      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.terminalReject(new Error('WebSocket reconnection limit reached'));
        return;
      }

      const idx = Math.min(this.reconnectAttempts, this.reconnectBackoff.length - 1);
      const delay = this.reconnectBackoff[idx] ?? this.reconnectBackoff[this.reconnectBackoff.length - 1];
      this.reconnectAttempts += 1;

      this.reconnectTimer = window.setTimeout(() => {
        this.reconnectTimer = null;
        this.openSocket();
      }, delay);
    };
  }

  private terminalReject(err: Error): void {
    this.onError?.(err.message);
    const reject = this.rejectStart;
    this.rejectStart = null;
    this.resolveStart = null;
    this.cleanupSocket();
    reject?.(err);
  }

  private async sendClientHello(): Promise<void> {
    if (!this.socket || this.aborted) return;
    try {
      const hello: SocketClientHello = {
        client_key: await this.getClientKey(),
        protocol_version: SOCKET_PROTOCOL_VERSION,
        request_token: this.lastRequestToken ?? undefined,
      };
      this.socket.send(JSON.stringify(hello));
    } catch {
      this.terminalReject(new Error('Failed to initialize websocket auth'));
    }
  }

  private parseMessage(raw: unknown): SocketAuthRequestToken | TokensData | SocketErrorMessage | null {
    if (typeof raw !== 'string') return null;

    let parsedMessage: unknown;
    try {
      parsedMessage = JSON.parse(raw);
    } catch {
      return null;
    }

    if (SocketAuthRequestTokenValidate(parsedMessage as SocketAuthRequestToken) === null) {
      return parsedMessage as SocketAuthRequestToken;
    }

    if (TokensDataValidate(parsedMessage as TokensData) === null) {
      return parsedMessage as TokensData;
    }

    if (SocketErrorMessageValidate(parsedMessage as SocketErrorMessage) === null) {
      return parsedMessage as SocketErrorMessage;
    }

    return null;
  }

  private clearConnectTimeout(): void {
    if (this.connectTimeoutTimer !== null) {
      clearTimeout(this.connectTimeoutTimer);
      this.connectTimeoutTimer = null;
    }
  }

  private clearTimers(): void {
    this.clearConnectTimeout();
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private cleanupSocket(): void {
    if (!this.socket) return;
    const ws = this.socket;
    this.socket = null;
    ws.onopen = null;
    ws.onclose = null;
    ws.onerror = null;
    ws.onmessage = null;
    try {
      if (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    } catch {
      /* noop */
    }
  }
}

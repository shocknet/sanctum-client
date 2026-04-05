import { SocketAuthRequestTokenValidate, TokensDataValidate, SocketErrorMessageValidate } from '../proto/types.js';

const AUTH_SOCKET_CANCELLED_MESSAGE = 'cancelled by user';
const DEFAULT_CONNECT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_RECONNECT_ATTEMPTS = 5;
const DEFAULT_RECONNECT_BACKOFF_MS = [10000, 10000, 10000, 20000, 20000, 30000, 60000];
const SOCKET_PROTOCOL_VERSION = 1;
class AuthSocketClient {
    constructor(options) {
        this.socket = null;
        this.resolveStart = null;
        this.rejectStart = null;
        this.connectTimeoutTimer = null;
        this.reconnectTimer = null;
        this.reconnectAttempts = 0;
        this.aborted = false;
        this.url = options.url;
        this.getClientKey = options.getClientKey;
        this.onState = options.onState;
        this.onRequestToken = options.onRequestToken;
        this.onError = options.onError;
        this.connectTimeoutMs = options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
        this.maxReconnectAttempts = options.maxReconnectAttempts ?? DEFAULT_MAX_RECONNECT_ATTEMPTS;
        this.reconnectBackoff = options.reconnectBackoff ?? [...DEFAULT_RECONNECT_BACKOFF_MS];
    }
    start() {
        if (this.socketPromise)
            return this.socketPromise;
        this.aborted = false;
        this.reconnectAttempts = 0;
        this.socketPromise = new Promise((resolve, reject) => {
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
    abort() {
        if (this.aborted)
            return;
        this.aborted = true;
        this.clearTimers();
        this.cleanupSocket();
        const reject = this.rejectStart;
        this.rejectStart = null;
        this.resolveStart = null;
        reject?.(new Error(AUTH_SOCKET_CANCELLED_MESSAGE));
    }
    openSocket() {
        if (this.aborted || !this.resolveStart)
            return;
        this.clearConnectTimeout();
        this.cleanupSocket();
        this.onState?.(this.reconnectAttempts > 0 ? 'reconnecting' : 'connecting');
        let ws;
        try {
            ws = new WebSocket(this.url);
        }
        catch {
            this.terminalReject(new Error('Failed to create WebSocket'));
            return;
        }
        this.socket = ws;
        this.connectTimeoutTimer = window.setTimeout(() => {
            if (this.aborted)
                return;
            this.onError?.('Connection timed out');
            try {
                ws.close();
            }
            catch {
                /* noop */
            }
        }, this.connectTimeoutMs);
        ws.onopen = () => {
            if (this.aborted)
                return;
            this.clearConnectTimeout();
            this.reconnectAttempts = 0;
            this.onState?.('connected');
            void this.sendClientHello();
        };
        ws.onmessage = (event) => {
            if (this.aborted)
                return;
            const parsed = this.parseMessage(event.data);
            if (!parsed) {
                this.terminalReject(new Error('Failed to parse websocket response'));
                return;
            }
            if ('request_token' in parsed) {
                this.onRequestToken?.(parsed);
                return;
            }
            if ('access_token' in parsed && 'refresh_token' in parsed) {
                const resolve = this.resolveStart;
                this.cleanupSocket();
                resolve?.(parsed);
                return;
            }
            if ('error' in parsed) {
                this.terminalReject(new Error(parsed.error || 'Socket auth failed'));
            }
        };
        ws.onerror = () => { };
        ws.onclose = () => {
            this.clearConnectTimeout();
            if (this.aborted)
                return;
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
    terminalReject(err) {
        this.onError?.(err.message);
        const reject = this.rejectStart;
        this.rejectStart = null;
        this.resolveStart = null;
        this.cleanupSocket();
        reject?.(err);
    }
    async sendClientHello() {
        if (!this.socket || this.aborted)
            return;
        try {
            const hello = {
                client_key: await this.getClientKey(),
                protocol_version: SOCKET_PROTOCOL_VERSION
            };
            this.socket.send(JSON.stringify(hello));
        }
        catch {
            this.terminalReject(new Error('Failed to initialize websocket auth'));
        }
    }
    parseMessage(raw) {
        if (typeof raw !== 'string')
            return null;
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(raw);
        }
        catch {
            return null;
        }
        if (SocketAuthRequestTokenValidate(parsedMessage) === null) {
            return parsedMessage;
        }
        if (TokensDataValidate(parsedMessage) === null) {
            return parsedMessage;
        }
        if (SocketErrorMessageValidate(parsedMessage) === null) {
            return parsedMessage;
        }
        return null;
    }
    clearConnectTimeout() {
        if (this.connectTimeoutTimer !== null) {
            clearTimeout(this.connectTimeoutTimer);
            this.connectTimeoutTimer = null;
        }
    }
    clearTimers() {
        this.clearConnectTimeout();
        if (this.reconnectTimer !== null) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
    cleanupSocket() {
        if (!this.socket)
            return;
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
        }
        catch {
            /* noop */
        }
    }
}

export { AUTH_SOCKET_CANCELLED_MESSAGE, AuthSocketClient };
//# sourceMappingURL=authSocketClient.js.map

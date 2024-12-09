import { TokenManager } from '../utils/tokenManager.js';
import { config } from '../utils/config.js';
import httpClient from '../proto/http-client.js';
import { ErrorCode, SanctumError } from '../utils/errors.js';

class SanctumAPI {
    static tokenManager = TokenManager.getInstance();
    static config = {
        onSessionExpired: (_, redirect) => redirect(),
        onInvalidToken: (clearToken) => clearToken()
    };
    static client = httpClient({
        baseUrl: config.SANCTUM_URL,
        // Get access token from TokenManager
        retrieveAccessTokenAuth: async () => {
            const tokenData = SanctumAPI.tokenManager.getToken();
            return tokenData ? tokenData.accessToken : null;
        },
        // These are required but unused
        encryptCallback: async () => { throw new Error("encryption not enabled"); },
        decryptCallback: async () => { throw new Error("encryption not enabled"); },
        retrieveGuestAuth: async () => { return ""; },
        retrieveUserAuth: async () => { throw new Error("User routes not enabled"); },
        deviceId: '',
    });
    static handleSessionExpired() {
        const cleartoken = () => this.tokenManager.clearToken();
        const redirectToReLogin = () => window.open(config.SANCTUM_URL, '_blank');
        this.config.onSessionExpired(cleartoken, redirectToReLogin);
    }
    static handleInvalidToken() {
        const clearToken = () => this.tokenManager.clearToken();
        this.config.onInvalidToken(clearToken);
    }
    static handleError(reason) {
        switch (reason) {
            case ErrorCode.ACCESS_TOKEN_INVALID:
            case ErrorCode.ACCESS_FORBIDDEN:
                this.handleInvalidToken();
                break;
            case ErrorCode.SESSION_EXPIRED:
                this.handleSessionExpired();
                break;
        }
        throw new Error(reason);
    }
    /**
   * Configures how the API handles session expiry and invalid tokens
   * @param config - Configuration options
   * @param {SessionExpiredHandler} config.onSessionExpired - Handler for expired sessions
   * @param {InvalidTokenHandler} config.onInvalidToken - Handler for invalid tokens
   * @example
   * // Configure session expiry and invalid token handlers
   * SanctumAPI.configure({
   *   onSessionExpired: (clearToken, redirect) => {
   *     analytics.track('session_expired');
   *     clearToken();
   *     redirect();
   *   },
   *   onInvalidToken: (clearToken) => {
   *     analytics.track('invalid_token');
   *     clearToken();
   *   }
   * });
   */
    static configure(config) {
        this.config = { ...this.config, ...config };
    }
    /**
   * Gets the Nostr public key for the current user
   * @returns Promise<string> The public key in hex format
   * @throws SanctumError if not authenticated
   */
    static async getPublicKey() {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.GetNostrPubKey();
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.pubkey;
    }
    /**
   * Gets the configured Nostr relays
   * @returns Promise<Record<string, {read: boolean, write: boolean}>>
   * @throws SanctumError if not authenticated
   */
    static async getRelays() {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.GetNostrRelays();
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.relays;
    }
    /**
     * Signs a Nostr event
     * @param event The unsigned event to sign (as JSON string)
     * @returns Promise<string> The signed event (as JSON string)
     * @throws SanctumError if not authenticated or signing fails
     */
    static async signEvent(event) {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.SignNostrEvent({ usignedEvent: event });
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.signedEvent;
    }
    /**
     * Encrypts data using NIP-44
     * @param plaintext The text to encrypt
     * @param pubkey The recipient's public key in hex format
     * @returns Promise<string> The encrypted text
     * @throws SanctumError if not authenticated or encryption fails
     */
    static async encrypt(plaintext, pubkey) {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.Nip44Encrypt({ plaintext, pubkey });
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.ciphertext;
    }
    /**
     * Decrypts data using NIP-44
     * @param ciphertext The text to decrypt
     * @param pubkey The sender's public key in hex format
     * @returns Promise<string> The decrypted text
     * @throws SanctumError if not authenticated or decryption fails
     */
    static async decrypt(ciphertext, pubkey) {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.Nip44Decrypt({ ciphertext, pubkey });
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.plaintext;
    }
    /**
     * Creates a NIP-98 authorization header
     * @param url The URL to sign
     * @param method The HTTP method
     * @param body Optional request body as JSON string
     * @returns Promise<string> The authorization header
     * @throws SanctumError if not authenticated or signing fails
     */
    static async createAuthHeader(url, method, body) {
        const token = this.tokenManager.getToken();
        if (!token) {
            throw new SanctumError('Not authenticated');
        }
        const result = await this.client.Nip98Event({
            url,
            method: method.toUpperCase(),
            request_body: body
        });
        if (result.status === 'ERROR') {
            this.handleError(result.reason);
        }
        return result.authorization_header;
    }
}

export { SanctumAPI };
//# sourceMappingURL=api.js.map

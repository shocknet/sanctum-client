import { SanctumAPIConfig } from '../types';
export declare class SanctumAPI {
    private static _client;
    private static tokenManager;
    private static config;
    private static get client();
    private static handleSessionExpired;
    private static handleInvalidToken;
    private static handleError;
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
    static configure(config: SanctumAPIConfig): void;
    /**
   * Gets the Nostr public key for the current user
   * @returns Promise<string> The public key in hex format
   * @throws SanctumError if not authenticated
   */
    static getPublicKey(): Promise<string>;
    /**
   * Gets the configured Nostr relays
   * @returns Promise<Record<string, {read: boolean, write: boolean}>>
   * @throws SanctumError if not authenticated
   */
    static getRelays(): Promise<Record<string, {
        read: boolean;
        write: boolean;
    }>>;
    /**
     * Signs a Nostr event
     * @param event The unsigned event to sign (as JSON string)
     * @returns Promise<string> The signed event (as JSON string)
     * @throws SanctumError if not authenticated or signing fails
     */
    static signEvent(event: string): Promise<string>;
    /**
     * Encrypts data using NIP-44
     * @param plaintext The text to encrypt
     * @param pubkey The recipient's public key in hex format
     * @returns Promise<string> The encrypted text
     * @throws SanctumError if not authenticated or encryption fails
     */
    static encrypt(plaintext: string, pubkey: string): Promise<string>;
    /**
     * Decrypts data using NIP-44
     * @param ciphertext The text to decrypt
     * @param pubkey The sender's public key in hex format
     * @returns Promise<string> The decrypted text
     * @throws SanctumError if not authenticated or decryption fails
     */
    static decrypt(ciphertext: string, pubkey: string): Promise<string>;
    /**
     * Creates a NIP-98 authorization header
     * @param url The URL to sign
     * @param method The HTTP method
     * @param body Optional request body as JSON string
     * @returns Promise<string> The authorization header
     * @throws SanctumError if not authenticated or signing fails
     */
    static createAuthHeader(url: string, method: string, body?: string): Promise<string>;
}

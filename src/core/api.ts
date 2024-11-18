import { TokenManager } from '../utils/tokenManager';
import { SanctumAPIConfig } from '../types';
import { config } from '../utils/config';
import httpClient from '../proto/http-client';
import { ErrorCode, SanctumError } from '../utils/errors';


export class SanctumAPI {
  private static tokenManager = TokenManager.getInstance();
  private static config: SanctumAPIConfig = {
    sessionExpiredAction: 'redirect'
  }
  private static client = httpClient({
    baseUrl: config.SANCTUM_URL,
    // Get access token from TokenManager
    retrieveAccessTokenAuth: async () => {
      const tokenData = SanctumAPI.tokenManager.getToken();
      return tokenData ? tokenData.accessToken : null;
    },
    // These are required but unused
    encryptCallback: async () => { throw new Error("encryption not enabled") },
    decryptCallback: async () => { throw new Error("encryption not enabled") },
    retrieveGuestAuth: async () => { return "" },
    retrieveUserAuth: async () => { throw new Error("User routes not enabled") },
    deviceId: '',
  });

  private static handleSessionExpired() {
    if (this.config.sessionExpiredAction === 'redirect') {
      window.open(config.SANCTUM_URL, '_blank');
    } else {
      this.tokenManager.clearToken();
    }
  }

  private static handleError(reason: string): never {
    switch (reason) {
      case ErrorCode.ACCESS_TOKEN_INVALID:
      case ErrorCode.ACCESS_FORBIDDEN:
        this.tokenManager.clearToken();
        break;
      case ErrorCode.SESSION_EXPIRED:
        this.handleSessionExpired();
        break;
    }
    throw new Error(reason);
  }

  /**
   * Configures how the API handles session expiry
   * @param config - Configuration options
   * @param {('redirect'|'clear')} config.sessionExpiredAction - How to handle expired sessions:
   *   - 'redirect': Opens Sanctum login in a new tab for the user to re-login (default)
   *   - 'clear': Clears the Sanctum token
   * @example
   * // Configure to redirect on session expiry
   * SanctumAPI.configure({
   *   sessionExpiredAction: 'redirect'
   * });
   * 
   * // Configure to clear token on session expiry
   * SanctumAPI.configure({
   *   sessionExpiredAction: 'clear'
   * });
   */
  static configure(config: SanctumAPIConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
 * Gets the Nostr public key for the current user
 * @returns Promise<string> The public key in hex format
 * @throws SanctumError if not authenticated
 */
  static async getPublicKey(): Promise<string> {
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
  static async getRelays(): Promise<Record<string, { read: boolean, write: boolean }>> {
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
  static async signEvent(event: string): Promise<string> {
    const token = this.tokenManager.getToken();
    if (!token) {
      throw new SanctumError('Not authenticated');
    }

    const result = await this.client.SignNostrEvent({ unsigned_event: event });
    if (result.status === 'ERROR') {
      this.handleError(result.reason);
    }
    return result.signed_event;
  }


  /**
   * Encrypts data using NIP-44
   * @param plaintext The text to encrypt
   * @param pubkey The recipient's public key in hex format
   * @returns Promise<string> The encrypted text
   * @throws SanctumError if not authenticated or encryption fails
   */
  static async encrypt(plaintext: string, pubkey: string): Promise<string> {
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
  static async decrypt(ciphertext: string, pubkey: string): Promise<string> {
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
  static async createAuthHeader(url: string, method: string, body?: string): Promise<string> {
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

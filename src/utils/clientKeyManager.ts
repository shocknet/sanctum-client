export class ClientKeyManager {
  private static instance: ClientKeyManager;
  private static readonly STORAGE_KEY = 'sanctum_client_key';
  private static readonly KEY_LENGTH = 8;

  private constructor() {}

  public static getInstance(): ClientKeyManager {
    if (!ClientKeyManager.instance) {
      ClientKeyManager.instance = new ClientKeyManager();
    }
    return ClientKeyManager.instance;
  }

  public getClientKey(): string {
    let clientKey = localStorage.getItem(ClientKeyManager.STORAGE_KEY);
    
    if (!clientKey) {
      clientKey = this.generateClientKey();
      this.setClientKey(clientKey);
    }

    return clientKey;
  }

  private setClientKey(clientKey: string): void {
    try {
      localStorage.setItem(ClientKeyManager.STORAGE_KEY, clientKey);
    } catch (error) {
      console.error('Failed to save client key to localStorage:', error);
    }
  }

  private generateClientKey(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    
    for (let i = 0; i < ClientKeyManager.KEY_LENGTH; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }
} 
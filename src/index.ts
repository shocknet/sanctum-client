import { SanctumWidget } from './core/widget';
import { SanctumAPI } from './core/api';
import { TokenData, TokenManager } from './utils/tokenManager';

export { SanctumWidget as widget, SanctumAPI as api }

export function onTokenChange(callback: (data: TokenData | null) => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === TokenManager.STORAGE_KEY) {
      const data = event.newValue ? JSON.parse(event.newValue) : null;
      callback(data);
    }
  };

  window.addEventListener('storage', handler);
  
  // Call immediately with current value
  const currentToken = TokenManager.getInstance().getToken();
  callback(currentToken);

  // Return cleanup function
  return () => window.removeEventListener('storage', handler);
}

// Add support for global usage when loaded via script tag
declare global {
  interface Window {
    Sanctum: {
      widget: typeof SanctumWidget;
      api: typeof SanctumAPI;
      onTokenChange: typeof onTokenChange;
    }
  }
}

if (typeof window !== 'undefined') {
  window.Sanctum = {
    widget: SanctumWidget,
    api: SanctumAPI,
    onTokenChange
  };
}

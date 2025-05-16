import { SanctumWidget } from './core/widget.js';
import { SanctumAPI } from './core/api.js';
import { TokenManager } from './utils/tokenManager.js';
import { setConfig } from './utils/config.js';

function onTokenChange(callback) {
    const handler = (event) => {
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
function initSanctum(config) {
    setConfig(config);
}
if (typeof window !== 'undefined') {
    window.Sanctum = {
        widget: SanctumWidget,
        api: SanctumAPI,
        onTokenChange,
        initSanctum
    };
}

export { SanctumAPI, SanctumWidget, initSanctum, onTokenChange };
//# sourceMappingURL=index.js.map

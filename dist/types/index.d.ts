import { SanctumWidget } from './core/widget';
import { SanctumAPI } from './core/api';
import { TokenData } from './utils/tokenManager';
export { SanctumWidget, SanctumAPI };
export declare function onTokenChange(callback: (data: TokenData | null) => void): () => void;
declare global {
    interface Window {
        Sanctum: {
            widget: typeof SanctumWidget;
            api: typeof SanctumAPI;
            onTokenChange: typeof onTokenChange;
        };
    }
}

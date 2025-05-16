import { SanctumWidget } from './core/widget';
import { SanctumAPI } from './core/api';
import { TokenData } from './utils/tokenManager';
import { SanctumConfig } from './utils/config';
export { SanctumWidget, SanctumAPI };
export declare function onTokenChange(callback: (data: TokenData | null) => void): () => void;
export declare function initSanctum(config: Partial<SanctumConfig>): void;
declare global {
    interface Window {
        Sanctum: {
            widget: typeof SanctumWidget;
            api: typeof SanctumAPI;
            onTokenChange: typeof onTokenChange;
            initSanctum: typeof initSanctum;
        };
    }
}

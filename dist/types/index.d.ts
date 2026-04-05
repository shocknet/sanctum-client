import { createSanctumSDK } from './core/client';
export { createSanctumSDK };
export { SanctumSdkError, ErrorCode } from './core/errors';
export type { AuthState, SanctumSDKConfig, SanctumSDKEvents, SanctumSDK, SanctumApi, SanctumStorageAdapter, SessionApi, TokenDataAdapter, TokensData, WidgetMountOptions, WidgetTheme } from './types';
declare global {
    interface Window {
        SanctumSDK?: {
            createSanctumSDK: typeof createSanctumSDK;
        };
    }
}

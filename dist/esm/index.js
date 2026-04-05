import { createSanctumSDK } from './core/client.js';
export { ErrorCode, SanctumSdkError } from './core/errors.js';

if (typeof window !== 'undefined') {
    window.SanctumSDK = {
        createSanctumSDK
    };
}

export { createSanctumSDK };
//# sourceMappingURL=index.js.map

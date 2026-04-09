import { createSanctumDK } from './core/client.js';
export { ErrorCode, SanctumDKError } from './core/errors.js';

if (typeof window !== 'undefined') {
    window.SanctumDK = {
        createSanctumDK
    };
}

export { createSanctumDK };
//# sourceMappingURL=index.js.map

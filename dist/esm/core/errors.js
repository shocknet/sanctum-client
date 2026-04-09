import { ErrorCode as ErrorCode$1 } from '../proto/types.js';

const ErrorCode = {
    ...ErrorCode$1,
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    INVALID_RESPONSE: 'INVALID_RESPONSE',
    ALREADY_DESTROYED: 'ALREADY_DESTROYED',
    WIDGET_CONTAINER_NOT_FOUND: 'WIDGET_CONTAINER_NOT_FOUND'
};
class SanctumDKError extends Error {
    constructor(message, code, recoverable = true, cause) {
        super(message);
        this.name = 'SanctumDKError';
        this.code = code;
        this.recoverable = recoverable;
        this.cause = cause;
    }
}
const isReauthReason = (reason) => {
    return reason === ErrorCode.REFRESH_TOKEN_EXPIRED
        || reason === ErrorCode.REFRESH_TOKEN_INVALID
        || reason === ErrorCode.REFRESH_TOKEN_REPLAYED
        || reason === ErrorCode.GRANT_REVOKED;
};

export { ErrorCode, SanctumDKError, isReauthReason };
//# sourceMappingURL=errors.js.map

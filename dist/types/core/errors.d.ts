import type { SanctumDKErrorShape } from '../types';
import { ErrorCode as ProtoErrorCode } from '../proto/types';
export declare const ErrorCode: {
    readonly NOT_AUTHENTICATED: "NOT_AUTHENTICATED";
    readonly INVALID_RESPONSE: "INVALID_RESPONSE";
    readonly ALREADY_DESTROYED: "ALREADY_DESTROYED";
    readonly WIDGET_CONTAINER_NOT_FOUND: "WIDGET_CONTAINER_NOT_FOUND";
    readonly ERROR_CODE_UNSPECIFIED: ProtoErrorCode.ERROR_CODE_UNSPECIFIED;
    readonly INVALID_SESSION: ProtoErrorCode.INVALID_SESSION;
    readonly ACCESS_TOKEN_INVALID: ProtoErrorCode.ACCESS_TOKEN_INVALID;
    readonly ACCESS_TOKEN_EXPIRED: ProtoErrorCode.ACCESS_TOKEN_EXPIRED;
    readonly ACCESS_FORBIDDEN: ProtoErrorCode.ACCESS_FORBIDDEN;
    readonly USER_NOT_FOUND: ProtoErrorCode.USER_NOT_FOUND;
    readonly GRANT_REVOKED: ProtoErrorCode.GRANT_REVOKED;
    readonly GRANT_NOT_FOUND: ProtoErrorCode.GRANT_NOT_FOUND;
    readonly CLIENT_BINDING_MISMATCH: ProtoErrorCode.CLIENT_BINDING_MISMATCH;
    readonly UPDATE_APP_TO_NEW_VERSION: ProtoErrorCode.UPDATE_APP_TO_NEW_VERSION;
    readonly OTP_INVALID: ProtoErrorCode.OTP_INVALID;
    readonly OTP_NOT_FOUND_OR_EXPIRED: ProtoErrorCode.OTP_NOT_FOUND_OR_EXPIRED;
    readonly OTP_ATTEMPTS_EXCEEDED: ProtoErrorCode.OTP_ATTEMPTS_EXCEEDED;
    readonly REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED: ProtoErrorCode.REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED;
    readonly REQUEST_TOKEN_INVALID: ProtoErrorCode.REQUEST_TOKEN_INVALID;
    readonly REFRESH_TOKEN_INVALID: ProtoErrorCode.REFRESH_TOKEN_INVALID;
    readonly REFRESH_TOKEN_EXPIRED: ProtoErrorCode.REFRESH_TOKEN_EXPIRED;
    readonly REFRESH_TOKEN_REPLAYED: ProtoErrorCode.REFRESH_TOKEN_REPLAYED;
    readonly INVALID_INPUT: ProtoErrorCode.INVALID_INPUT;
    readonly UNKNOWN_ERROR: ProtoErrorCode.UNKNOWN_ERROR;
};
export declare class SanctumDKError extends Error implements SanctumDKErrorShape {
    code: string;
    recoverable: boolean;
    cause?: unknown;
    constructor(message: string, code: string, recoverable?: boolean, cause?: unknown);
}
export declare const isReauthReason: (reason: string) => boolean;

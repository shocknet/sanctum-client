import type { SanctumSdkErrorShape } from '../types';
import { ErrorCode as ProtoErrorCode } from '../proto/types';

export const ErrorCode = {
  ...ProtoErrorCode,
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  ALREADY_DESTROYED: 'ALREADY_DESTROYED',
  WIDGET_CONTAINER_NOT_FOUND: 'WIDGET_CONTAINER_NOT_FOUND'
} as const;

export class SanctumSdkError extends Error implements SanctumSdkErrorShape {
  code: string;
  recoverable: boolean;
  cause?: unknown;

  constructor(message: string, code: string, recoverable = true, cause?: unknown) {
    super(message);
    this.name = 'SanctumSdkError';
    this.code = code;
    this.recoverable = recoverable;
    this.cause = cause;
  }
}

export const isReauthReason = (reason: string): boolean => {
  return reason === ErrorCode.REFRESH_TOKEN_EXPIRED
    || reason === ErrorCode.REFRESH_TOKEN_INVALID
    || reason === ErrorCode.REFRESH_TOKEN_REPLAYED
    || reason === ErrorCode.GRANT_REVOKED;
};

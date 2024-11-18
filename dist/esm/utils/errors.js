var ErrorCode;
(function (ErrorCode) {
    // Auth errors
    ErrorCode["SESSION_EXPIRED"] = "SESSION_EXPIRED";
    ErrorCode["INVALID_SESSION"] = "INVALID_SESSION";
    ErrorCode["ACCESS_TOKEN_INVALID"] = "ACCESS_TOKEN_INVALID";
    ErrorCode["ACCESS_FORBIDDEN"] = "ACCESS_FORBIDDEN";
    ErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    // OTP errors
    ErrorCode["OTP_INVALID"] = "OTP_INVALID";
    ErrorCode["OTP_NOT_FOUND_OR_EXPIRED"] = "OTP_NOT_FOUND_OR_EXPIRED";
    ErrorCode["OTP_ATTEMPTS_EXCEEDED"] = "OTP_ATTEMPTS_EXCEEDED";
    // Request token errors
    ErrorCode["REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED"] = "REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED";
    ErrorCode["REQUEST_TOKEN_INVALID"] = "REQUEST_TOKEN_INVALID";
    // Validation errors
    ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
    // Access token operations errors
    ErrorCode["INVALID_NOSTR_EVENT"] = "INVALID_NOSTR_EVENT";
    // Generic Errors
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(ErrorCode || (ErrorCode = {}));
class SanctumError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SanctumError';
    }
}

export { ErrorCode, SanctumError };
//# sourceMappingURL=errors.js.map

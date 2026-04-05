type Request = any;
type Response = any;
export type ResultError = {
    status: 'ERROR';
    reason: string;
};
export type RequestInfo = {
    rpcName: string;
    batch: boolean;
    nostr: boolean;
    batchSize: number;
};
export type RequestStats = {
    startMs: number;
    start: bigint;
    parse: bigint;
    guard: bigint;
    validate: bigint;
    handle: bigint;
};
export type RequestMetric = AuthContext & RequestInfo & RequestStats & {
    error?: string;
};
export type GuestContext = {};
export type GuestMethodInputs = Health_Input | UpgradeLegacyAccessToken_Input | RequestCallback_Input | AuthEmail_Input | GetRequestTokenData_Input | GetAuthRequestInfo_Input | AuthWithNsec_Input | SignupWithNsecAccessToken_Input | CheckSession_Input | Logout_Input | MintFromRefreshToken_Input;
export type GuestMethodOutputs = Health_Output | UpgradeLegacyAccessToken_Output | RequestCallback_Output | AuthEmail_Output | GetRequestTokenData_Output | GetAuthRequestInfo_Output | AuthWithNsec_Output | SignupWithNsecAccessToken_Output | CheckSession_Output | Logout_Output | MintFromRefreshToken_Output;
export type LegacyAccessTokenContext = {
    access_token: string;
};
export type LegacyAccessTokenMethodInputs = LegacyGetNostrPubKey_Input | LegacyGetNostrRelays_Input | LegacySignNostrEvent_Input | LegacyNip44Decrypt_Input | LegacyNip44Encrypt_Input | LegacyNip98Event_Input;
export type LegacyAccessTokenMethodOutputs = LegacyGetNostrPubKey_Output | LegacyGetNostrRelays_Output | LegacySignNostrEvent_Output | LegacyNip44Decrypt_Output | LegacyNip44Encrypt_Output | LegacyNip98Event_Output;
export type AccessTokenContext = {
    grant_id: string;
};
export type AccessTokenMethodInputs = GetNostrPubKey_Input | GetNostrRelays_Input | SignNostrEvent_Input | Nip44Decrypt_Input | Nip44Encrypt_Input | Nip98Event_Input;
export type AccessTokenMethodOutputs = GetNostrPubKey_Output | GetNostrRelays_Output | SignNostrEvent_Output | Nip44Decrypt_Output | Nip44Encrypt_Output | Nip98Event_Output;
export type UserContext = {
    user_id: string;
};
export type UserMethodInputs = AuthorizeRequestToken_Input | GetUserInfo_Input | GetUserGrants_Input | GetGrantRecords_Input | RevokeGrant_Input;
export type UserMethodOutputs = AuthorizeRequestToken_Output | GetUserInfo_Output | GetUserGrants_Output | GetGrantRecords_Output | RevokeGrant_Output;
export type AuthContext = GuestContext | LegacyAccessTokenContext | AccessTokenContext | UserContext;
export type Health_Input = {
    rpcName: 'Health';
};
export type Health_Output = ResultError | {
    status: 'OK';
};
export type LegacyGetNostrPubKey_Input = {
    rpcName: 'LegacyGetNostrPubKey';
};
export type LegacyGetNostrPubKey_Output = ResultError | {
    status: 'OK';
};
export type LegacyGetNostrRelays_Input = {
    rpcName: 'LegacyGetNostrRelays';
};
export type LegacyGetNostrRelays_Output = ResultError | {
    status: 'OK';
};
export type LegacySignNostrEvent_Input = {
    rpcName: 'LegacySignNostrEvent';
    req: NostrSignRequest;
};
export type LegacySignNostrEvent_Output = ResultError | {
    status: 'OK';
};
export type LegacyNip44Decrypt_Input = {
    rpcName: 'LegacyNip44Decrypt';
    req: Nip44DecryptRequest;
};
export type LegacyNip44Decrypt_Output = ResultError | {
    status: 'OK';
};
export type LegacyNip44Encrypt_Input = {
    rpcName: 'LegacyNip44Encrypt';
    req: Nip44EncryptRequest;
};
export type LegacyNip44Encrypt_Output = ResultError | {
    status: 'OK';
};
export type LegacyNip98Event_Input = {
    rpcName: 'LegacyNip98Event';
    req: Nip98EventRequest;
};
export type LegacyNip98Event_Output = ResultError | {
    status: 'OK';
};
export type UpgradeLegacyAccessToken_Input = {
    rpcName: 'UpgradeLegacyAccessToken';
    req: UpgradeLegacyAccessTokenRequest;
};
export type UpgradeLegacyAccessToken_Output = ResultError | ({
    status: 'OK';
} & TokensData);
export type GetNostrPubKey_Input = {
    rpcName: 'GetNostrPubKey';
};
export type GetNostrPubKey_Output = ResultError | ({
    status: 'OK';
} & UserNostrPubKey);
export type GetNostrRelays_Input = {
    rpcName: 'GetNostrRelays';
};
export type GetNostrRelays_Output = ResultError | ({
    status: 'OK';
} & NostrRelays);
export type SignNostrEvent_Input = {
    rpcName: 'SignNostrEvent';
    req: NostrSignRequest;
};
export type SignNostrEvent_Output = ResultError | ({
    status: 'OK';
} & NostrSignResponse);
export type Nip44Decrypt_Input = {
    rpcName: 'Nip44Decrypt';
    req: Nip44DecryptRequest;
};
export type Nip44Decrypt_Output = ResultError | ({
    status: 'OK';
} & Nip44DecryptResponse);
export type Nip44Encrypt_Input = {
    rpcName: 'Nip44Encrypt';
    req: Nip44EncryptRequest;
};
export type Nip44Encrypt_Output = ResultError | ({
    status: 'OK';
} & Nip44EncryptResponse);
export type Nip98Event_Input = {
    rpcName: 'Nip98Event';
    req: Nip98EventRequest;
};
export type Nip98Event_Output = ResultError | ({
    status: 'OK';
} & Nip98EventResponse);
export type RequestCallback_Input = {
    rpcName: 'RequestCallback';
    req: RequestCallbackRequest;
};
export type RequestCallback_Output = ResultError | ({
    status: 'OK';
} & RequestCallbackResponse);
export type AuthorizeRequestToken_Input = {
    rpcName: 'AuthorizeRequestToken';
    req: AuthorizeRequestTokenRequest;
};
export type AuthorizeRequestToken_Output = ResultError | {
    status: 'OK';
};
export type AuthEmail_Input = {
    rpcName: 'AuthEmail';
    req: AuthRequest;
};
export type AuthEmail_Output = ResultError | ({
    status: 'OK';
} & AuthResponse);
export type GetUserInfo_Input = {
    rpcName: 'GetUserInfo';
};
export type GetUserInfo_Output = ResultError | ({
    status: 'OK';
} & GetUserInfoResponse);
export type GetUserGrants_Input = {
    rpcName: 'GetUserGrants';
};
export type GetUserGrants_Output = ResultError | ({
    status: 'OK';
} & GetUserGrantsResponse);
export type GetGrantRecords_Input = {
    rpcName: 'GetGrantRecords';
    req: GetGrantRecordsRequest;
};
export type GetGrantRecords_Output = ResultError | ({
    status: 'OK';
} & GetGrantRecordsResponse);
export type RevokeGrant_Input = {
    rpcName: 'RevokeGrant';
    req: RevokeGrantRequest;
};
export type RevokeGrant_Output = ResultError | {
    status: 'OK';
};
export type GetRequestTokenData_Input = {
    rpcName: 'GetRequestTokenData';
    req: GetRequestTokenDataRequest;
};
export type GetRequestTokenData_Output = ResultError | ({
    status: 'OK';
} & GetRequestTokenDataResponse);
export type GetAuthRequestInfo_Input = {
    rpcName: 'GetAuthRequestInfo';
    req: GetAuthRequestInfoRequest;
};
export type GetAuthRequestInfo_Output = ResultError | ({
    status: 'OK';
} & GetAuthRequestInfoResponse);
export type AuthWithNsec_Input = {
    rpcName: 'AuthWithNsec';
    req: AuthWithNsecRequest;
};
export type AuthWithNsec_Output = ResultError | ({
    status: 'OK';
} & AuthWithNsecResponse);
export type SignupWithNsecAccessToken_Input = {
    rpcName: 'SignupWithNsecAccessToken';
    req: SignupWithNsecAccessTokenRequest;
};
export type SignupWithNsecAccessToken_Output = ResultError | ({
    status: 'OK';
} & SignupWithNsecAccessTokenResponse);
export type CheckSession_Input = {
    rpcName: 'CheckSession';
};
export type CheckSession_Output = ResultError | ({
    status: 'OK';
} & CheckSessionResponse);
export type Logout_Input = {
    rpcName: 'Logout';
};
export type Logout_Output = ResultError | {
    status: 'OK';
};
export type MintFromRefreshToken_Input = {
    rpcName: 'MintFromRefreshToken';
    req: MintFromRefreshTokenRequest;
};
export type MintFromRefreshToken_Output = ResultError | ({
    status: 'OK';
} & TokensData);
export type ServerMethods = {
    Health?: (req: Health_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacyGetNostrPubKey?: (req: LegacyGetNostrPubKey_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacyGetNostrRelays?: (req: LegacyGetNostrRelays_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacySignNostrEvent?: (req: LegacySignNostrEvent_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacyNip44Decrypt?: (req: LegacyNip44Decrypt_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacyNip44Encrypt?: (req: LegacyNip44Encrypt_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    LegacyNip98Event?: (req: LegacyNip98Event_Input & {
        ctx: LegacyAccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    UpgradeLegacyAccessToken?: (req: UpgradeLegacyAccessToken_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<TokensData>;
    GetNostrPubKey?: (req: GetNostrPubKey_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<UserNostrPubKey>;
    GetNostrRelays?: (req: GetNostrRelays_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<NostrRelays>;
    SignNostrEvent?: (req: SignNostrEvent_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<NostrSignResponse>;
    Nip44Decrypt?: (req: Nip44Decrypt_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<Nip44DecryptResponse>;
    Nip44Encrypt?: (req: Nip44Encrypt_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<Nip44EncryptResponse>;
    Nip98Event?: (req: Nip98Event_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<Nip98EventResponse>;
    RequestCallback?: (req: RequestCallback_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<RequestCallbackResponse>;
    AuthorizeRequestToken?: (req: AuthorizeRequestToken_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    AuthEmail?: (req: AuthEmail_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<AuthResponse>;
    GetUserInfo?: (req: GetUserInfo_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetUserInfoResponse>;
    GetUserGrants?: (req: GetUserGrants_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetUserGrantsResponse>;
    GetGrantRecords?: (req: GetGrantRecords_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetGrantRecordsResponse>;
    RevokeGrant?: (req: RevokeGrant_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    GetRequestTokenData?: (req: GetRequestTokenData_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetRequestTokenDataResponse>;
    GetAuthRequestInfo?: (req: GetAuthRequestInfo_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetAuthRequestInfoResponse>;
    AuthWithNsec?: (req: AuthWithNsec_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<AuthWithNsecResponse>;
    SignupWithNsecAccessToken?: (req: SignupWithNsecAccessToken_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<SignupWithNsecAccessTokenResponse>;
    CheckSession?: (req: CheckSession_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<CheckSessionResponse>;
    Logout?: (req: Logout_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    MintFromRefreshToken?: (req: MintFromRefreshToken_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<TokensData>;
};
export declare enum ErrorCode {
    ERROR_CODE_UNSPECIFIED = "ERROR_CODE_UNSPECIFIED",
    INVALID_SESSION = "INVALID_SESSION",
    ACCESS_TOKEN_INVALID = "ACCESS_TOKEN_INVALID",
    ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
    ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    GRANT_REVOKED = "GRANT_REVOKED",
    GRANT_NOT_FOUND = "GRANT_NOT_FOUND",
    CLIENT_BINDING_MISMATCH = "CLIENT_BINDING_MISMATCH",
    UPDATE_APP_TO_NEW_VERSION = "UPDATE_APP_TO_NEW_VERSION",
    OTP_INVALID = "OTP_INVALID",
    OTP_NOT_FOUND_OR_EXPIRED = "OTP_NOT_FOUND_OR_EXPIRED",
    OTP_ATTEMPTS_EXCEEDED = "OTP_ATTEMPTS_EXCEEDED",
    REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED = "REQUEST_TOKEN_NOT_FOUND_OR_EXPIRED",
    REQUEST_TOKEN_INVALID = "REQUEST_TOKEN_INVALID",
    REFRESH_TOKEN_INVALID = "REFRESH_TOKEN_INVALID",
    REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
    REFRESH_TOKEN_REPLAYED = "REFRESH_TOKEN_REPLAYED",
    INVALID_INPUT = "INVALID_INPUT",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
export declare enum GrantStatus {
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED"
}
export type OptionsBaseMessage = {
    allOptionalsAreSet?: true;
};
export type GrantRecord = {
    type: string;
    ip_address: string;
    timestamp: number;
    origin: string;
    user_agent: string;
    meta_json: string;
    grant_id: string;
};
export declare const GrantRecordOptionalFields: [];
export type GrantRecordOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    ip_address_CustomCheck?: (v: string) => boolean;
    timestamp_CustomCheck?: (v: number) => boolean;
    origin_CustomCheck?: (v: string) => boolean;
    user_agent_CustomCheck?: (v: string) => boolean;
    meta_json_CustomCheck?: (v: string) => boolean;
    grant_id_CustomCheck?: (v: string) => boolean;
    type_CustomCheck?: (v: string) => boolean;
};
export declare const GrantRecordValidate: (o?: GrantRecord, opts?: GrantRecordOptions, path?: string) => Error | null;
export type GetGrantRecordsRequest = {
    max: number;
    page: number;
    grant_id: string;
};
export declare const GetGrantRecordsRequestOptionalFields: [];
export type GetGrantRecordsRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    page_CustomCheck?: (v: number) => boolean;
    grant_id_CustomCheck?: (v: string) => boolean;
    max_CustomCheck?: (v: number) => boolean;
};
export declare const GetGrantRecordsRequestValidate: (o?: GetGrantRecordsRequest, opts?: GetGrantRecordsRequestOptions, path?: string) => Error | null;
export type GetGrantRecordsResponse = {
    records: GrantRecord[];
    is_last_page: boolean;
};
export declare const GetGrantRecordsResponseOptionalFields: [];
export type GetGrantRecordsResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    records_ItemOptions?: GrantRecordOptions;
    records_CustomCheck?: (v: GrantRecord[]) => boolean;
    is_last_page_CustomCheck?: (v: boolean) => boolean;
};
export declare const GetGrantRecordsResponseValidate: (o?: GetGrantRecordsResponse, opts?: GetGrantRecordsResponseOptions, path?: string) => Error | null;
export type RevokeGrantRequest = {
    grant_id: string;
};
export declare const RevokeGrantRequestOptionalFields: [];
export type RevokeGrantRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    grant_id_CustomCheck?: (v: string) => boolean;
};
export declare const RevokeGrantRequestValidate: (o?: RevokeGrantRequest, opts?: RevokeGrantRequestOptions, path?: string) => Error | null;
export type Nip44DecryptRequest = {
    ciphertext: string;
    pubkey: string;
};
export declare const Nip44DecryptRequestOptionalFields: [];
export type Nip44DecryptRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    pubkey_CustomCheck?: (v: string) => boolean;
    ciphertext_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44DecryptRequestValidate: (o?: Nip44DecryptRequest, opts?: Nip44DecryptRequestOptions, path?: string) => Error | null;
export type Nip44DecryptResponse = {
    plaintext: string;
};
export declare const Nip44DecryptResponseOptionalFields: [];
export type Nip44DecryptResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    plaintext_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44DecryptResponseValidate: (o?: Nip44DecryptResponse, opts?: Nip44DecryptResponseOptions, path?: string) => Error | null;
export type Nip44EncryptResponse = {
    ciphertext: string;
};
export declare const Nip44EncryptResponseOptionalFields: [];
export type Nip44EncryptResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    ciphertext_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44EncryptResponseValidate: (o?: Nip44EncryptResponse, opts?: Nip44EncryptResponseOptions, path?: string) => Error | null;
export type AuthRequest = {
    email: string;
    request_token?: string;
};
export type AuthRequestOptionalField = 'request_token';
export declare const AuthRequestOptionalFields: AuthRequestOptionalField[];
export type AuthRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: AuthRequestOptionalField[];
    email_CustomCheck?: (v: string) => boolean;
    request_token_CustomCheck?: (v?: string) => boolean;
};
export declare const AuthRequestValidate: (o?: AuthRequest, opts?: AuthRequestOptions, path?: string) => Error | null;
export type GetUserGrantsResponse = {
    grants: GrantInfo[];
};
export declare const GetUserGrantsResponseOptionalFields: [];
export type GetUserGrantsResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    grants_ItemOptions?: GrantInfoOptions;
    grants_CustomCheck?: (v: GrantInfo[]) => boolean;
};
export declare const GetUserGrantsResponseValidate: (o?: GetUserGrantsResponse, opts?: GetUserGrantsResponseOptions, path?: string) => Error | null;
export type UserNostrPubKey = {
    pubkey: string;
};
export declare const UserNostrPubKeyOptionalFields: [];
export type UserNostrPubKeyOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    pubkey_CustomCheck?: (v: string) => boolean;
};
export declare const UserNostrPubKeyValidate: (o?: UserNostrPubKey, opts?: UserNostrPubKeyOptions, path?: string) => Error | null;
export type Nip98EventRequest = {
    url: string;
    request_body?: string;
    method: string;
};
export type Nip98EventRequestOptionalField = 'request_body';
export declare const Nip98EventRequestOptionalFields: Nip98EventRequestOptionalField[];
export type Nip98EventRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: Nip98EventRequestOptionalField[];
    request_body_CustomCheck?: (v?: string) => boolean;
    method_CustomCheck?: (v: string) => boolean;
    url_CustomCheck?: (v: string) => boolean;
};
export declare const Nip98EventRequestValidate: (o?: Nip98EventRequest, opts?: Nip98EventRequestOptions, path?: string) => Error | null;
export type Nip44EncryptRequest = {
    plaintext: string;
    pubkey: string;
};
export declare const Nip44EncryptRequestOptionalFields: [];
export type Nip44EncryptRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    plaintext_CustomCheck?: (v: string) => boolean;
    pubkey_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44EncryptRequestValidate: (o?: Nip44EncryptRequest, opts?: Nip44EncryptRequestOptions, path?: string) => Error | null;
export type RequestCallbackResponse = {
    auth: boolean;
};
export declare const RequestCallbackResponseOptionalFields: [];
export type RequestCallbackResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    auth_CustomCheck?: (v: boolean) => boolean;
};
export declare const RequestCallbackResponseValidate: (o?: RequestCallbackResponse, opts?: RequestCallbackResponseOptions, path?: string) => Error | null;
export type GetAuthRequestInfoRequest = {
    submit_token: string;
    request_token?: string;
};
export type GetAuthRequestInfoRequestOptionalField = 'request_token';
export declare const GetAuthRequestInfoRequestOptionalFields: GetAuthRequestInfoRequestOptionalField[];
export type GetAuthRequestInfoRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: GetAuthRequestInfoRequestOptionalField[];
    submit_token_CustomCheck?: (v: string) => boolean;
    request_token_CustomCheck?: (v?: string) => boolean;
};
export declare const GetAuthRequestInfoRequestValidate: (o?: GetAuthRequestInfoRequest, opts?: GetAuthRequestInfoRequestOptions, path?: string) => Error | null;
export type GrantInfo = {
    created_at: number;
    origin: string;
    user_agent: string;
    public_key: string;
    status: GrantStatus;
    refresh_expires_at: number;
    label: string;
    grant_id: string;
    last_used: number;
    client_key: string;
};
export declare const GrantInfoOptionalFields: [];
export type GrantInfoOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    client_key_CustomCheck?: (v: string) => boolean;
    status_CustomCheck?: (v: GrantStatus) => boolean;
    refresh_expires_at_CustomCheck?: (v: number) => boolean;
    label_CustomCheck?: (v: string) => boolean;
    grant_id_CustomCheck?: (v: string) => boolean;
    last_used_CustomCheck?: (v: number) => boolean;
    public_key_CustomCheck?: (v: string) => boolean;
    created_at_CustomCheck?: (v: number) => boolean;
    origin_CustomCheck?: (v: string) => boolean;
    user_agent_CustomCheck?: (v: string) => boolean;
};
export declare const GrantInfoValidate: (o?: GrantInfo, opts?: GrantInfoOptions, path?: string) => Error | null;
export type GetUserInfoResponse = {
    key_slots: Record<string, number>;
    identifier: string;
};
export declare const GetUserInfoResponseOptionalFields: [];
export type GetUserInfoResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    identifier_CustomCheck?: (v: string) => boolean;
    key_slots_CustomCheck?: (v: Record<string, number>) => boolean;
};
export declare const GetUserInfoResponseValidate: (o?: GetUserInfoResponse, opts?: GetUserInfoResponseOptions, path?: string) => Error | null;
export type AuthWithNsecRequest = {
    nostr_secret: string;
    request_token?: string;
};
export type AuthWithNsecRequestOptionalField = 'request_token';
export declare const AuthWithNsecRequestOptionalFields: AuthWithNsecRequestOptionalField[];
export type AuthWithNsecRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: AuthWithNsecRequestOptionalField[];
    request_token_CustomCheck?: (v?: string) => boolean;
    nostr_secret_CustomCheck?: (v: string) => boolean;
};
export declare const AuthWithNsecRequestValidate: (o?: AuthWithNsecRequest, opts?: AuthWithNsecRequestOptions, path?: string) => Error | null;
export type AuthWithNsecResponse = {
    auth: boolean;
};
export declare const AuthWithNsecResponseOptionalFields: [];
export type AuthWithNsecResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    auth_CustomCheck?: (v: boolean) => boolean;
};
export declare const AuthWithNsecResponseValidate: (o?: AuthWithNsecResponse, opts?: AuthWithNsecResponseOptions, path?: string) => Error | null;
export type ErrorDetails = {
    code: ErrorCode;
    reason: string;
};
export declare const ErrorDetailsOptionalFields: [];
export type ErrorDetailsOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    code_CustomCheck?: (v: ErrorCode) => boolean;
    reason_CustomCheck?: (v: string) => boolean;
};
export declare const ErrorDetailsValidate: (o?: ErrorDetails, opts?: ErrorDetailsOptions, path?: string) => Error | null;
export type AuthorizeRequestTokenRequest = {
    request_token: string;
    key_slot: number;
    label?: string;
};
export type AuthorizeRequestTokenRequestOptionalField = 'label';
export declare const AuthorizeRequestTokenRequestOptionalFields: AuthorizeRequestTokenRequestOptionalField[];
export type AuthorizeRequestTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: AuthorizeRequestTokenRequestOptionalField[];
    label_CustomCheck?: (v?: string) => boolean;
    request_token_CustomCheck?: (v: string) => boolean;
    key_slot_CustomCheck?: (v: number) => boolean;
};
export declare const AuthorizeRequestTokenRequestValidate: (o?: AuthorizeRequestTokenRequest, opts?: AuthorizeRequestTokenRequestOptions, path?: string) => Error | null;
export type AuthResponse = {
    submit_token: string;
};
export declare const AuthResponseOptionalFields: [];
export type AuthResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    submit_token_CustomCheck?: (v: string) => boolean;
};
export declare const AuthResponseValidate: (o?: AuthResponse, opts?: AuthResponseOptions, path?: string) => Error | null;
export type CheckSessionResponse = {
    valid: boolean;
};
export declare const CheckSessionResponseOptionalFields: [];
export type CheckSessionResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    valid_CustomCheck?: (v: boolean) => boolean;
};
export declare const CheckSessionResponseValidate: (o?: CheckSessionResponse, opts?: CheckSessionResponseOptions, path?: string) => Error | null;
export type UpdateAccessTokenInfoRequest = {
    label: string;
    access_token: string;
};
export declare const UpdateAccessTokenInfoRequestOptionalFields: [];
export type UpdateAccessTokenInfoRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    label_CustomCheck?: (v: string) => boolean;
    access_token_CustomCheck?: (v: string) => boolean;
};
export declare const UpdateAccessTokenInfoRequestValidate: (o?: UpdateAccessTokenInfoRequest, opts?: UpdateAccessTokenInfoRequestOptions, path?: string) => Error | null;
export type MintFromRefreshTokenRequest = {
    refresh_token: string;
};
export declare const MintFromRefreshTokenRequestOptionalFields: [];
export type MintFromRefreshTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    refresh_token_CustomCheck?: (v: string) => boolean;
};
export declare const MintFromRefreshTokenRequestValidate: (o?: MintFromRefreshTokenRequest, opts?: MintFromRefreshTokenRequestOptions, path?: string) => Error | null;
export type SocketAuthRequestToken = {
    request_token: string;
    expires_at: number;
};
export declare const SocketAuthRequestTokenOptionalFields: [];
export type SocketAuthRequestTokenOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    request_token_CustomCheck?: (v: string) => boolean;
    expires_at_CustomCheck?: (v: number) => boolean;
};
export declare const SocketAuthRequestTokenValidate: (o?: SocketAuthRequestToken, opts?: SocketAuthRequestTokenOptions, path?: string) => Error | null;
export type RequestCallbackRequest = {
    otp: string;
    submit_token: string;
};
export declare const RequestCallbackRequestOptionalFields: [];
export type RequestCallbackRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    submit_token_CustomCheck?: (v: string) => boolean;
    otp_CustomCheck?: (v: string) => boolean;
};
export declare const RequestCallbackRequestValidate: (o?: RequestCallbackRequest, opts?: RequestCallbackRequestOptions, path?: string) => Error | null;
export type SignupWithNsecAccessTokenRequest = {
    nostr_secret: string;
    client_key: string;
};
export declare const SignupWithNsecAccessTokenRequestOptionalFields: [];
export type SignupWithNsecAccessTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    nostr_secret_CustomCheck?: (v: string) => boolean;
    client_key_CustomCheck?: (v: string) => boolean;
};
export declare const SignupWithNsecAccessTokenRequestValidate: (o?: SignupWithNsecAccessTokenRequest, opts?: SignupWithNsecAccessTokenRequestOptions, path?: string) => Error | null;
export type SocketClientHello = {
    client_key: string;
    protocol_version: number;
};
export declare const SocketClientHelloOptionalFields: [];
export type SocketClientHelloOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    client_key_CustomCheck?: (v: string) => boolean;
    protocol_version_CustomCheck?: (v: number) => boolean;
};
export declare const SocketClientHelloValidate: (o?: SocketClientHello, opts?: SocketClientHelloOptions, path?: string) => Error | null;
export type Empty = {};
export declare const EmptyOptionalFields: [];
export type EmptyOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
};
export declare const EmptyValidate: (o?: Empty, opts?: EmptyOptions, path?: string) => Error | null;
export type NostrRelays = {
    relays: Record<string, RelayPolicy>;
};
export declare const NostrRelaysOptionalFields: [];
export type NostrRelaysOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    relays_EntryOptions?: RelayPolicyOptions;
    relays_CustomCheck?: (v: Record<string, RelayPolicy>) => boolean;
};
export declare const NostrRelaysValidate: (o?: NostrRelays, opts?: NostrRelaysOptions, path?: string) => Error | null;
export type NostrSignRequest = {
    usignedEvent: string;
};
export declare const NostrSignRequestOptionalFields: [];
export type NostrSignRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    usignedEvent_CustomCheck?: (v: string) => boolean;
};
export declare const NostrSignRequestValidate: (o?: NostrSignRequest, opts?: NostrSignRequestOptions, path?: string) => Error | null;
export type NostrSignResponse = {
    signedEvent: string;
};
export declare const NostrSignResponseOptionalFields: [];
export type NostrSignResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    signedEvent_CustomCheck?: (v: string) => boolean;
};
export declare const NostrSignResponseValidate: (o?: NostrSignResponse, opts?: NostrSignResponseOptions, path?: string) => Error | null;
export type RequestSanctumTokenRequest = {
    email: string;
    app_id: string;
};
export declare const RequestSanctumTokenRequestOptionalFields: [];
export type RequestSanctumTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    email_CustomCheck?: (v: string) => boolean;
    app_id_CustomCheck?: (v: string) => boolean;
};
export declare const RequestSanctumTokenRequestValidate: (o?: RequestSanctumTokenRequest, opts?: RequestSanctumTokenRequestOptions, path?: string) => Error | null;
export type SignupWithNsecAccessTokenResponse = {
    access_token: string;
    refresh_token: string;
};
export declare const SignupWithNsecAccessTokenResponseOptionalFields: [];
export type SignupWithNsecAccessTokenResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
    refresh_token_CustomCheck?: (v: string) => boolean;
};
export declare const SignupWithNsecAccessTokenResponseValidate: (o?: SignupWithNsecAccessTokenResponse, opts?: SignupWithNsecAccessTokenResponseOptions, path?: string) => Error | null;
export type UpgradeLegacyAccessTokenRequest = {
    access_token: string;
};
export declare const UpgradeLegacyAccessTokenRequestOptionalFields: [];
export type UpgradeLegacyAccessTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
};
export declare const UpgradeLegacyAccessTokenRequestValidate: (o?: UpgradeLegacyAccessTokenRequest, opts?: UpgradeLegacyAccessTokenRequestOptions, path?: string) => Error | null;
export type RelayPolicy = {
    read: boolean;
    write: boolean;
};
export declare const RelayPolicyOptionalFields: [];
export type RelayPolicyOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    read_CustomCheck?: (v: boolean) => boolean;
    write_CustomCheck?: (v: boolean) => boolean;
};
export declare const RelayPolicyValidate: (o?: RelayPolicy, opts?: RelayPolicyOptions, path?: string) => Error | null;
export type GetRequestTokenDataRequest = {
    request_token: string;
};
export declare const GetRequestTokenDataRequestOptionalFields: [];
export type GetRequestTokenDataRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    request_token_CustomCheck?: (v: string) => boolean;
};
export declare const GetRequestTokenDataRequestValidate: (o?: GetRequestTokenDataRequest, opts?: GetRequestTokenDataRequestOptions, path?: string) => Error | null;
export type GetRequestTokenDataResponse = {
    domain: string;
    user_agent: string;
};
export declare const GetRequestTokenDataResponseOptionalFields: [];
export type GetRequestTokenDataResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    domain_CustomCheck?: (v: string) => boolean;
    user_agent_CustomCheck?: (v: string) => boolean;
};
export declare const GetRequestTokenDataResponseValidate: (o?: GetRequestTokenDataResponse, opts?: GetRequestTokenDataResponseOptions, path?: string) => Error | null;
export type GetAuthRequestInfoResponse = {
    email: string;
    expires_at: number;
};
export declare const GetAuthRequestInfoResponseOptionalFields: [];
export type GetAuthRequestInfoResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    email_CustomCheck?: (v: string) => boolean;
    expires_at_CustomCheck?: (v: number) => boolean;
};
export declare const GetAuthRequestInfoResponseValidate: (o?: GetAuthRequestInfoResponse, opts?: GetAuthRequestInfoResponseOptions, path?: string) => Error | null;
export type Nip98EventResponse = {
    authorization_header: string;
};
export declare const Nip98EventResponseOptionalFields: [];
export type Nip98EventResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    authorization_header_CustomCheck?: (v: string) => boolean;
};
export declare const Nip98EventResponseValidate: (o?: Nip98EventResponse, opts?: Nip98EventResponseOptions, path?: string) => Error | null;
export type TokensData = {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    refresh_expires_at: number;
    identifier: string;
    account_identifier: string;
};
export declare const TokensDataOptionalFields: [];
export type TokensDataOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
    refresh_token_CustomCheck?: (v: string) => boolean;
    expires_at_CustomCheck?: (v: number) => boolean;
    refresh_expires_at_CustomCheck?: (v: number) => boolean;
    identifier_CustomCheck?: (v: string) => boolean;
    account_identifier_CustomCheck?: (v: string) => boolean;
};
export declare const TokensDataValidate: (o?: TokensData, opts?: TokensDataOptions, path?: string) => Error | null;
export type SocketErrorMessage = {
    error: string;
};
export declare const SocketErrorMessageOptionalFields: [];
export type SocketErrorMessageOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    error_CustomCheck?: (v: string) => boolean;
};
export declare const SocketErrorMessageValidate: (o?: SocketErrorMessage, opts?: SocketErrorMessageOptions, path?: string) => Error | null;
export {};

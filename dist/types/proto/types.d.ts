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
export type GuestMethodInputs = Health_Input | RequestCallback_Input | AuthEmail_Input | GetRequestTokenData_Input | GetAuthRequestInfo_Input | AuthWithNsec_Input | SignupWithNsecAccessToken_Input | CheckSession_Input;
export type GuestMethodOutputs = Health_Output | RequestCallback_Output | AuthEmail_Output | GetRequestTokenData_Output | GetAuthRequestInfo_Output | AuthWithNsec_Output | SignupWithNsecAccessToken_Output | CheckSession_Output;
export type AccessTokenContext = {
    access_token: string;
};
export type AccessTokenMethodInputs = GetNostrPubKey_Input | GetNostrRelays_Input | SignNostrEvent_Input | Nip44Decrypt_Input | Nip44Encrypt_Input | Nip98Event_Input;
export type AccessTokenMethodOutputs = GetNostrPubKey_Output | GetNostrRelays_Output | SignNostrEvent_Output | Nip44Decrypt_Output | Nip44Encrypt_Output | Nip98Event_Output;
export type UserContext = {
    user_id: string;
};
export type UserMethodInputs = AuthorizeRequestToken_Input | GetAccessTokenRecords_Input | GetUserInfo_Input | DeleteAccessToken_Input | UpdateAccessTokenInfo_Input;
export type UserMethodOutputs = AuthorizeRequestToken_Output | GetAccessTokenRecords_Output | GetUserInfo_Output | DeleteAccessToken_Output | UpdateAccessTokenInfo_Output;
export type AuthContext = GuestContext | AccessTokenContext | UserContext;
export type Health_Input = {
    rpcName: 'Health';
};
export type Health_Output = ResultError | {
    status: 'OK';
};
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
export type GetAccessTokenRecords_Input = {
    rpcName: 'GetAccessTokenRecords';
    req: GetAccessTokenRecordsRequest;
};
export type GetAccessTokenRecords_Output = ResultError | ({
    status: 'OK';
} & GetAccessTokenRecordsResponse);
export type GetUserInfo_Input = {
    rpcName: 'GetUserInfo';
};
export type GetUserInfo_Output = ResultError | ({
    status: 'OK';
} & GetUserInfoResponse);
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
export type DeleteAccessToken_Input = {
    rpcName: 'DeleteAccessToken';
    req: DeleteAccessTokenRequest;
};
export type DeleteAccessToken_Output = ResultError | {
    status: 'OK';
};
export type Nip98Event_Input = {
    rpcName: 'Nip98Event';
    req: Nip98EventRequest;
};
export type Nip98Event_Output = ResultError | ({
    status: 'OK';
} & Nip98EventResponse);
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
export type UpdateAccessTokenInfo_Input = {
    rpcName: 'UpdateAccessTokenInfo';
    req: UpdateAccessTokenInfoRequest;
};
export type UpdateAccessTokenInfo_Output = ResultError | {
    status: 'OK';
};
export type ServerMethods = {
    Health?: (req: Health_Input & {
        ctx: GuestContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
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
    GetAccessTokenRecords?: (req: GetAccessTokenRecords_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetAccessTokenRecordsResponse>;
    GetUserInfo?: (req: GetUserInfo_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<GetUserInfoResponse>;
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
    DeleteAccessToken?: (req: DeleteAccessToken_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
    Nip98Event?: (req: Nip98Event_Input & {
        ctx: AccessTokenContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<Nip98EventResponse>;
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
    UpdateAccessTokenInfo?: (req: UpdateAccessTokenInfo_Input & {
        ctx: UserContext;
        requestObject: Request;
        responseObject: Response;
    }) => Promise<void>;
};
export type OptionsBaseMessage = {
    allOptionalsAreSet?: true;
};
export type GetUserAccessTokenRequest = {
    app_id: string;
    sanctum_token: string;
};
export declare const GetUserAccessTokenRequestOptionalFields: [];
export type GetUserAccessTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    app_id_CustomCheck?: (v: string) => boolean;
    sanctum_token_CustomCheck?: (v: string) => boolean;
};
export declare const GetUserAccessTokenRequestValidate: (o?: GetUserAccessTokenRequest, opts?: GetUserAccessTokenRequestOptions, path?: string) => Error | null;
export type RequestCallbackResponse = {
    auth: boolean;
};
export declare const RequestCallbackResponseOptionalFields: [];
export type RequestCallbackResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    auth_CustomCheck?: (v: boolean) => boolean;
};
export declare const RequestCallbackResponseValidate: (o?: RequestCallbackResponse, opts?: RequestCallbackResponseOptions, path?: string) => Error | null;
export type AccessTokenInfo = {
    client_key: string;
    created_at: number;
    label: string;
    access_token: string;
    origin: string;
    user_agent: string;
    last_used: number;
    public_key: string;
};
export declare const AccessTokenInfoOptionalFields: [];
export type AccessTokenInfoOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    created_at_CustomCheck?: (v: number) => boolean;
    label_CustomCheck?: (v: string) => boolean;
    access_token_CustomCheck?: (v: string) => boolean;
    origin_CustomCheck?: (v: string) => boolean;
    user_agent_CustomCheck?: (v: string) => boolean;
    last_used_CustomCheck?: (v: number) => boolean;
    public_key_CustomCheck?: (v: string) => boolean;
    client_key_CustomCheck?: (v: string) => boolean;
};
export declare const AccessTokenInfoValidate: (o?: AccessTokenInfo, opts?: AccessTokenInfoOptions, path?: string) => Error | null;
export type Nip44DecryptRequest = {
    ciphertext: string;
    pubkey: string;
};
export declare const Nip44DecryptRequestOptionalFields: [];
export type Nip44DecryptRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    ciphertext_CustomCheck?: (v: string) => boolean;
    pubkey_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44DecryptRequestValidate: (o?: Nip44DecryptRequest, opts?: Nip44DecryptRequestOptions, path?: string) => Error | null;
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
export type RequestCallbackRequest = {
    submit_token: string;
    otp: string;
};
export declare const RequestCallbackRequestOptionalFields: [];
export type RequestCallbackRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    submit_token_CustomCheck?: (v: string) => boolean;
    otp_CustomCheck?: (v: string) => boolean;
};
export declare const RequestCallbackRequestValidate: (o?: RequestCallbackRequest, opts?: RequestCallbackRequestOptions, path?: string) => Error | null;
export type AuthorizeRequestTokenRequest = {
    request_token: string;
    key_slot: number;
};
export declare const AuthorizeRequestTokenRequestOptionalFields: [];
export type AuthorizeRequestTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    request_token_CustomCheck?: (v: string) => boolean;
    key_slot_CustomCheck?: (v: number) => boolean;
};
export declare const AuthorizeRequestTokenRequestValidate: (o?: AuthorizeRequestTokenRequest, opts?: AuthorizeRequestTokenRequestOptions, path?: string) => Error | null;
export type GetRequestTokenDataRequest = {
    request_token: string;
};
export declare const GetRequestTokenDataRequestOptionalFields: [];
export type GetRequestTokenDataRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    request_token_CustomCheck?: (v: string) => boolean;
};
export declare const GetRequestTokenDataRequestValidate: (o?: GetRequestTokenDataRequest, opts?: GetRequestTokenDataRequestOptions, path?: string) => Error | null;
export type AuthWithNsecRequest = {
    nostr_secret: string;
    request_token?: string;
};
export type AuthWithNsecRequestOptionalField = 'request_token';
export declare const AuthWithNsecRequestOptionalFields: AuthWithNsecRequestOptionalField[];
export type AuthWithNsecRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: AuthWithNsecRequestOptionalField[];
    nostr_secret_CustomCheck?: (v: string) => boolean;
    request_token_CustomCheck?: (v?: string) => boolean;
};
export declare const AuthWithNsecRequestValidate: (o?: AuthWithNsecRequest, opts?: AuthWithNsecRequestOptions, path?: string) => Error | null;
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
export type DeleteAccessTokenRequest = {
    access_token: string;
};
export declare const DeleteAccessTokenRequestOptionalFields: [];
export type DeleteAccessTokenRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
};
export declare const DeleteAccessTokenRequestValidate: (o?: DeleteAccessTokenRequest, opts?: DeleteAccessTokenRequestOptions, path?: string) => Error | null;
export type AuthWithNsecResponse = {
    auth: boolean;
};
export declare const AuthWithNsecResponseOptionalFields: [];
export type AuthWithNsecResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    auth_CustomCheck?: (v: boolean) => boolean;
};
export declare const AuthWithNsecResponseValidate: (o?: AuthWithNsecResponse, opts?: AuthWithNsecResponseOptions, path?: string) => Error | null;
export type CheckSessionResponse = {
    valid: boolean;
};
export declare const CheckSessionResponseOptionalFields: [];
export type CheckSessionResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    valid_CustomCheck?: (v: boolean) => boolean;
};
export declare const CheckSessionResponseValidate: (o?: CheckSessionResponse, opts?: CheckSessionResponseOptions, path?: string) => Error | null;
export type Nip98EventResponse = {
    authorization_header: string;
};
export declare const Nip98EventResponseOptionalFields: [];
export type Nip98EventResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    authorization_header_CustomCheck?: (v: string) => boolean;
};
export declare const Nip98EventResponseValidate: (o?: Nip98EventResponse, opts?: Nip98EventResponseOptions, path?: string) => Error | null;
export type Empty = {};
export declare const EmptyOptionalFields: [];
export type EmptyOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
};
export declare const EmptyValidate: (o?: Empty, opts?: EmptyOptions, path?: string) => Error | null;
export type UserNostrPubKey = {
    pubkey: string;
};
export declare const UserNostrPubKeyOptionalFields: [];
export type UserNostrPubKeyOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    pubkey_CustomCheck?: (v: string) => boolean;
};
export declare const UserNostrPubKeyValidate: (o?: UserNostrPubKey, opts?: UserNostrPubKeyOptions, path?: string) => Error | null;
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
export type NostrSignResponse = {
    signedEvent: string;
};
export declare const NostrSignResponseOptionalFields: [];
export type NostrSignResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    signedEvent_CustomCheck?: (v: string) => boolean;
};
export declare const NostrSignResponseValidate: (o?: NostrSignResponse, opts?: NostrSignResponseOptions, path?: string) => Error | null;
export type GetUserAccessTokenResponse = {
    access_token: string;
};
export declare const GetUserAccessTokenResponseOptionalFields: [];
export type GetUserAccessTokenResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
};
export declare const GetUserAccessTokenResponseValidate: (o?: GetUserAccessTokenResponse, opts?: GetUserAccessTokenResponseOptions, path?: string) => Error | null;
export type GetAccessTokenRecordsResponse = {
    records: AccessTokenRecord[];
    is_last_page: boolean;
};
export declare const GetAccessTokenRecordsResponseOptionalFields: [];
export type GetAccessTokenRecordsResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    records_ItemOptions?: AccessTokenRecordOptions;
    records_CustomCheck?: (v: AccessTokenRecord[]) => boolean;
    is_last_page_CustomCheck?: (v: boolean) => boolean;
};
export declare const GetAccessTokenRecordsResponseValidate: (o?: GetAccessTokenRecordsResponse, opts?: GetAccessTokenRecordsResponseOptions, path?: string) => Error | null;
export type Nip98EventRequest = {
    request_body?: string;
    method: string;
    url: string;
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
export type AuthResponse = {
    submit_token: string;
};
export declare const AuthResponseOptionalFields: [];
export type AuthResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    submit_token_CustomCheck?: (v: string) => boolean;
};
export declare const AuthResponseValidate: (o?: AuthResponse, opts?: AuthResponseOptions, path?: string) => Error | null;
export type SignupWithNsecAccessTokenResponse = {
    access_token: string;
};
export declare const SignupWithNsecAccessTokenResponseOptionalFields: [];
export type SignupWithNsecAccessTokenResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
};
export declare const SignupWithNsecAccessTokenResponseValidate: (o?: SignupWithNsecAccessTokenResponse, opts?: SignupWithNsecAccessTokenResponseOptions, path?: string) => Error | null;
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
export type Nip44EncryptResponse = {
    ciphertext: string;
};
export declare const Nip44EncryptResponseOptionalFields: [];
export type Nip44EncryptResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    ciphertext_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44EncryptResponseValidate: (o?: Nip44EncryptResponse, opts?: Nip44EncryptResponseOptions, path?: string) => Error | null;
export type AccessTokenRecord = {
    timestamp: number;
    access_token: string;
    nevent: string;
    type: string;
    ip_address: string;
};
export declare const AccessTokenRecordOptionalFields: [];
export type AccessTokenRecordOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    access_token_CustomCheck?: (v: string) => boolean;
    nevent_CustomCheck?: (v: string) => boolean;
    type_CustomCheck?: (v: string) => boolean;
    ip_address_CustomCheck?: (v: string) => boolean;
    timestamp_CustomCheck?: (v: number) => boolean;
};
export declare const AccessTokenRecordValidate: (o?: AccessTokenRecord, opts?: AccessTokenRecordOptions, path?: string) => Error | null;
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
export type Nip44DecryptResponse = {
    plaintext: string;
};
export declare const Nip44DecryptResponseOptionalFields: [];
export type Nip44DecryptResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    plaintext_CustomCheck?: (v: string) => boolean;
};
export declare const Nip44DecryptResponseValidate: (o?: Nip44DecryptResponse, opts?: Nip44DecryptResponseOptions, path?: string) => Error | null;
export type GetAccessTokenRecordsRequest = {
    access_token: string;
    max: number;
    page: number;
};
export declare const GetAccessTokenRecordsRequestOptionalFields: [];
export type GetAccessTokenRecordsRequestOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    page_CustomCheck?: (v: number) => boolean;
    access_token_CustomCheck?: (v: string) => boolean;
    max_CustomCheck?: (v: number) => boolean;
};
export declare const GetAccessTokenRecordsRequestValidate: (o?: GetAccessTokenRecordsRequest, opts?: GetAccessTokenRecordsRequestOptions, path?: string) => Error | null;
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
export type GetUserInfoResponse = {
    user_access_tokens: AccessTokenInfo[];
    key_slots: Record<string, number>;
    identifier: string;
};
export declare const GetUserInfoResponseOptionalFields: [];
export type GetUserInfoResponseOptions = OptionsBaseMessage & {
    checkOptionalsAreSet?: [];
    key_slots_CustomCheck?: (v: Record<string, number>) => boolean;
    identifier_CustomCheck?: (v: string) => boolean;
    user_access_tokens_ItemOptions?: AccessTokenInfoOptions;
    user_access_tokens_CustomCheck?: (v: AccessTokenInfo[]) => boolean;
};
export declare const GetUserInfoResponseValidate: (o?: GetUserInfoResponse, opts?: GetUserInfoResponseOptions, path?: string) => Error | null;
export {};

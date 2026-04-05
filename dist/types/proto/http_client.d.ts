import * as Types from './types.js';
export type ResultError = {
    status: 'ERROR';
    reason: string;
};
export type ClientParams = {
    baseUrl: string;
    retrieveGuestAuth: () => Promise<string | null>;
    retrieveLegacyAccessTokenAuth: () => Promise<string | null>;
    retrieveAccessTokenAuth: () => Promise<string | null>;
    retrieveUserAuth: () => Promise<string | null>;
    encryptCallback: (plain: any) => Promise<any>;
    decryptCallback: (encrypted: any) => Promise<any>;
    deviceId: string;
    checkResult?: true;
};
declare const _default: (params: ClientParams) => {
    Health: () => Promise<ResultError | ({
        status: "OK";
    })>;
    GetNostrPubKey: () => Promise<ResultError | ({
        status: "OK";
    } & Types.UserNostrPubKey)>;
    GetNostrRelays: () => Promise<ResultError | ({
        status: "OK";
    } & Types.NostrRelays)>;
    SignNostrEvent: (request: Types.NostrSignRequest) => Promise<ResultError | ({
        status: "OK";
    } & Types.NostrSignResponse)>;
    Nip44Decrypt: (request: Types.Nip44DecryptRequest) => Promise<ResultError | ({
        status: "OK";
    } & Types.Nip44DecryptResponse)>;
    Nip44Encrypt: (request: Types.Nip44EncryptRequest) => Promise<ResultError | ({
        status: "OK";
    } & Types.Nip44EncryptResponse)>;
    Nip98Event: (request: Types.Nip98EventRequest) => Promise<ResultError | ({
        status: "OK";
    } & Types.Nip98EventResponse)>;
    MintFromRefreshToken: (request: Types.MintFromRefreshTokenRequest) => Promise<ResultError | ({
        status: "OK";
    } & Types.TokensData)>;
};
export default _default;

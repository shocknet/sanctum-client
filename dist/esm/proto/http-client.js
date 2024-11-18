import { fetchAdapter } from './fetch-adapter.js';
import { UserNostrPubKeyValidate, NostrRelaysValidate, NostrSignResponseValidate, Nip44DecryptResponseValidate, Nip44EncryptResponseValidate, Nip98EventResponseValidate } from './types.js';

// This file was autogenerated from a .proto file, DO NOT EDIT!
var httpClient = (params) => ({
    GetNostrPubKey: async () => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/pubkey';
        const { data } = await fetchAdapter.get(params.baseUrl + finalRoute, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = UserNostrPubKeyValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
    GetNostrRelays: async () => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/relays';
        const { data } = await fetchAdapter.get(params.baseUrl + finalRoute, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = NostrRelaysValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
    SignNostrEvent: async (request) => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/sign';
        const { data } = await fetchAdapter.post(params.baseUrl + finalRoute, request, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = NostrSignResponseValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
    Nip44Decrypt: async (request) => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/decrypt';
        const { data } = await fetchAdapter.post(params.baseUrl + finalRoute, request, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = Nip44DecryptResponseValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
    Nip44Encrypt: async (request) => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/encrypt';
        const { data } = await fetchAdapter.post(params.baseUrl + finalRoute, request, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = Nip44EncryptResponseValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
    Nip98Event: async (request) => {
        const auth = await params.retrieveAccessTokenAuth();
        if (auth === null)
            throw new Error('retrieveAccessTokenAuth() returned null');
        let finalRoute = '/api/user/nip98';
        const { data } = await fetchAdapter.post(params.baseUrl + finalRoute, request, {
            headers: { 'authorization': auth }
        });
        if (data.status === 'ERROR' && typeof data.reason === 'string')
            return data;
        if (data.status === 'OK') {
            const result = data;
            if (!params.checkResult)
                return { status: 'OK', ...result };
            const error = Nip98EventResponseValidate(result);
            if (error === null) {
                return { status: 'OK', ...result };
            }
            else
                return { status: 'ERROR', reason: error.message };
        }
        return { status: 'ERROR', reason: 'invalid response' };
    },
});

export { httpClient as default };
//# sourceMappingURL=http-client.js.map

// This file was autogenerated from a .proto file, DO NOT EDIT!
const Nip98EventResponseValidate = (o, opts = {}, path = 'Nip98EventResponse::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.authorization_header !== 'string')
        return new Error(`${path}.authorization_header: is not a string`);
    if (opts.authorization_header_CustomCheck && !opts.authorization_header_CustomCheck(o.authorization_header))
        return new Error(`${path}.authorization_header: custom check failed`);
    return null;
};
const UserNostrPubKeyValidate = (o, opts = {}, path = 'UserNostrPubKey::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.pubkey !== 'string')
        return new Error(`${path}.pubkey: is not a string`);
    if (opts.pubkey_CustomCheck && !opts.pubkey_CustomCheck(o.pubkey))
        return new Error(`${path}.pubkey: custom check failed`);
    return null;
};
const RelayPolicyValidate = (o, opts = {}, path = 'RelayPolicy::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.read !== 'boolean')
        return new Error(`${path}.read: is not a boolean`);
    if (opts.read_CustomCheck && !opts.read_CustomCheck(o.read))
        return new Error(`${path}.read: custom check failed`);
    if (typeof o.write !== 'boolean')
        return new Error(`${path}.write: is not a boolean`);
    if (opts.write_CustomCheck && !opts.write_CustomCheck(o.write))
        return new Error(`${path}.write: custom check failed`);
    return null;
};
const NostrSignResponseValidate = (o, opts = {}, path = 'NostrSignResponse::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.signedEvent !== 'string')
        return new Error(`${path}.signedEvent: is not a string`);
    if (opts.signedEvent_CustomCheck && !opts.signedEvent_CustomCheck(o.signedEvent))
        return new Error(`${path}.signedEvent: custom check failed`);
    return null;
};
const NostrRelaysValidate = (o, opts = {}, path = 'NostrRelays::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.relays !== 'object' || o.relays === null)
        return new Error(`${path}.relays: is not an object or is null`);
    for (const key in o.relays) {
        const relaysErr = RelayPolicyValidate(o.relays[key], opts.relays_EntryOptions, `${path}.relays['${key}']`);
        if (relaysErr !== null)
            return relaysErr;
    }
    return null;
};
const Nip44EncryptResponseValidate = (o, opts = {}, path = 'Nip44EncryptResponse::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.ciphertext !== 'string')
        return new Error(`${path}.ciphertext: is not a string`);
    if (opts.ciphertext_CustomCheck && !opts.ciphertext_CustomCheck(o.ciphertext))
        return new Error(`${path}.ciphertext: custom check failed`);
    return null;
};
const Nip44DecryptResponseValidate = (o, opts = {}, path = 'Nip44DecryptResponse::root.') => {
    if (opts.checkOptionalsAreSet && opts.allOptionalsAreSet)
        return new Error(path + ': only one of checkOptionalsAreSet or allOptionalNonDefault can be set for each message');
    if (typeof o !== 'object' || o === null)
        return new Error(path + ': object is not an instance of an object or is null');
    if (typeof o.plaintext !== 'string')
        return new Error(`${path}.plaintext: is not a string`);
    if (opts.plaintext_CustomCheck && !opts.plaintext_CustomCheck(o.plaintext))
        return new Error(`${path}.plaintext: custom check failed`);
    return null;
};

export { Nip44DecryptResponseValidate, Nip44EncryptResponseValidate, Nip98EventResponseValidate, NostrRelaysValidate, NostrSignResponseValidate, RelayPolicyValidate, UserNostrPubKeyValidate };
//# sourceMappingURL=types.js.map

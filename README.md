# SanctumSDK

Instance-based Sanctum browser SDK designed for predictable lifecycle behavior and stronger developer ergonomics.

## Design Goals

- No global mutable runtime state
- Explicit client lifecycle (`init`, `destroy`)
- Typed event subscriptions (no global callback overwrite)
- Single-flight token refresh with deterministic reauth handling
- Closed-shadow widget boundary (host apps cannot style or inspect internals)


## Quick Start

```ts
import { createSanctumSDK } from 'sanctum-sdk';

const client = createSanctumSDK({
  url: 'https://auth.shock.network',
  websocketUrl: 'wss://auth.shock.network'
});

await client.init();

const offToken = client.events.onTokenChange((token) => {
  console.log('Token changed', token);
});

client.widget.mount({
  containerId: 'sanctum-widget',
  theme: 'system'
});

const pubkey = await client.api.getPublicKey();
console.log(pubkey);

offToken();
await client.destroy();
```

## API Surface

### `createSanctumSDK(config)`

Creates an isolated client instance. Multiple instances can exist without sharing state.

Config:

- `url` (required)
- `websocketUrl` (optional, derived from `url` if omitted)
- `storageAdapter` (optional)
- `tokenDataAdapter` (optional)

### `client.api`

- `getPublicKey()`
- `getRelays()`
- `signEvent(eventJson)`
- `encrypt(plaintext, pubkey)`
- `decrypt(ciphertext, pubkey)`
- `createAuthHeader(url, method, body?)`
- `getTokenData()`
- `clearTokens()`

### `client.widget`

- `mount({ containerId, theme?, openAuthWindow? })`
- `setTheme(theme)`
- `unmount()`

Widget internals run inside a **closed shadow root** and are intentionally not customizable.

### `client.events`

- `onTokenChange(handler)`
- `onTokensUpdated(handler)`
- `onReauthRequired(handler)`
- `onAuthStateChanged(handler)`

All event APIs return `unsubscribe`.

## Reauth Behavior

The client always routes these errors through the same reauth path:

- `REFRESH_TOKEN_EXPIRED`
- `REFRESH_TOKEN_INVALID`
- `REFRESH_TOKEN_REPLAYED`
- `GRANT_REVOKED`

Reauth path:

1. token storage cleared
2. `onReauthRequired` emitted
3. API call throws `SanctumSdkError` with `recoverable=false`

## Development

```bash
npm run build
npm run test
npm run serve
```

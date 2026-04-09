import { describe, expect, it } from 'vitest';
import { createSanctumDK } from './client';
import { ErrorCode } from './errors';

describe('createSanctumDK', () => {


  it('destroy() prevents widget.mount() reuse', async () => {
    const client = createSanctumDK({ url: 'https://auth.example.com' });
    await client.destroy();
    expect(() => client.widget.mount({ containerId: 'missing' })).toThrowError(
      expect.objectContaining({ code: ErrorCode.ALREADY_DESTROYED })
    );
  });
});

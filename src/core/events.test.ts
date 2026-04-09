import { describe, expect, it, vi } from 'vitest';
import { TypedEventBus } from './events';

describe('TypedEventBus', () => {
  it('subscribes, emits, and unsubscribes', () => {
    const bus = new TypedEventBus();
    const spy = vi.fn();

    const off = bus.on('authStateChanged', spy);
    bus.emit('authStateChanged', 'connecting');
    expect(spy).toHaveBeenCalledWith('connecting');

    off();
    bus.emit('authStateChanged', 'authenticated');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('clear() removes all handlers', () => {
    const bus = new TypedEventBus();
    const a = vi.fn();
    const b = vi.fn();

    bus.on('tokenChange', a);
    bus.on('tokenChange', b);
    bus.clear();

    bus.emit('tokenChange', null);
    expect(a).not.toHaveBeenCalled();
    expect(b).not.toHaveBeenCalled();
  });
});


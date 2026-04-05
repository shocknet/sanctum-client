import type { AuthState, ReauthContext, TokensData } from '../types';

type EventMap = {
  tokensUpdated: TokensData;
  tokenChange: TokensData | null;
  reauthRequired: ReauthContext;
  authStateChanged: AuthState;
};

type Handler<T> = (payload: T) => void;

export class TypedEventBus {
  private handlers: { [K in keyof EventMap]: Set<Handler<EventMap[K]>> } = {
    tokensUpdated: new Set(),
    tokenChange: new Set(),
    reauthRequired: new Set(),
    authStateChanged: new Set()
  };

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    for (const handler of this.handlers[event]) {
      handler(payload);
    }
  }

  on<K extends keyof EventMap>(event: K, handler: Handler<EventMap[K]>): () => void {
    this.handlers[event].add(handler);
    return () => {
      this.handlers[event].delete(handler);
    };
  }

  clear(): void {
    for (const key of Object.keys(this.handlers) as (keyof EventMap)[]) {
      this.handlers[key].clear();
    }
  }
}

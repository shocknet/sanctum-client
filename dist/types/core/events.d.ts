import type { AuthState, ReauthContext, TokensData } from '../types';
type EventMap = {
    tokensUpdated: TokensData;
    tokenChange: TokensData | null;
    reauthRequired: ReauthContext;
    authStateChanged: AuthState;
};
type Handler<T> = (payload: T) => void;
export declare class TypedEventBus {
    private handlers;
    emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void;
    on<K extends keyof EventMap>(event: K, handler: Handler<EventMap[K]>): () => void;
    clear(): void;
}
export {};

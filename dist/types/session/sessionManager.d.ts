import type { TokenDataAdapter, TokensData } from '../types';
import { TypedEventBus } from '../core/events';
export declare class SessionManager {
    private tokenDataAdapter;
    private events;
    constructor(tokenDataAdapter: TokenDataAdapter, events: TypedEventBus);
    getTokenData(): Promise<TokensData | null>;
    setTokenData(tokensData: TokensData): Promise<void>;
    clear(): Promise<void>;
    updateTokensAfterRefresh(tokensData: TokensData): Promise<void>;
}

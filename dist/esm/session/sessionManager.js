class SessionManager {
    constructor(tokenDataAdapter, events) {
        this.tokenDataAdapter = tokenDataAdapter;
        this.events = events;
    }
    async getTokenData() {
        return Promise.resolve(this.tokenDataAdapter.getTokenData());
    }
    async setTokenData(tokensData) {
        await Promise.resolve(this.tokenDataAdapter.setTokenData(tokensData));
        this.events.emit('tokenChange', tokensData);
        this.events.emit('tokensUpdated', tokensData);
        this.events.emit('authStateChanged', 'authenticated');
    }
    async clear() {
        await Promise.resolve(this.tokenDataAdapter.clearTokenData());
        this.events.emit('tokenChange', null);
        this.events.emit('authStateChanged', 'idle');
    }
    async updateTokensAfterRefresh(tokensData) {
        await Promise.resolve(this.tokenDataAdapter.setTokenData(tokensData));
        this.events.emit('tokenChange', tokensData);
        this.events.emit('tokensUpdated', tokensData);
    }
}

export { SessionManager };
//# sourceMappingURL=sessionManager.js.map

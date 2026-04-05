class TypedEventBus {
    constructor() {
        this.handlers = {
            tokensUpdated: new Set(),
            tokenChange: new Set(),
            reauthRequired: new Set(),
            authStateChanged: new Set()
        };
    }
    emit(event, payload) {
        for (const handler of this.handlers[event]) {
            handler(payload);
        }
    }
    on(event, handler) {
        this.handlers[event].add(handler);
        return () => {
            this.handlers[event].delete(handler);
        };
    }
    clear() {
        for (const key of Object.keys(this.handlers)) {
            this.handlers[key].clear();
        }
    }
}

export { TypedEventBus };
//# sourceMappingURL=events.js.map

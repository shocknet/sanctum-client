const config = {
    SANCTUM_URL: "http://localhost:2002",
    SANCTUM_WS_URL: "ws://localhost:2002",
};
// Validate config at build time
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export { config };
//# sourceMappingURL=config.js.map

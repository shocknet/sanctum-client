const config = {
    SANCTUM_URL: "https://auth.shocklab.dev",
    SANCTUM_WS_URL: "wss://auth.shocklab.dev",
};
// Validate config at build time
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export { config };
//# sourceMappingURL=config.js.map

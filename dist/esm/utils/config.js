const config = {
    SANCTUM_URL: "https://auth.shock.network/",
    SANCTUM_WS_URL: "https://auth.shock.network/",
};
// Validate config at build time
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export { config };
//# sourceMappingURL=config.js.map

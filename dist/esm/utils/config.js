const config = {
    SANCTUM_URL: "https://sanctum.example.com",
    SANCTUM_WS_URL: "wss://sanctum.example.com/ws",
};
// Validate config at build time
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export { config };
//# sourceMappingURL=config.js.map

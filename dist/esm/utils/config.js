let config = null;
function assertUrl(label, value) {
    if (typeof value !== 'string')
        throw new Error(`${label} must be a string`);
    try {
        new URL(value); // built-in URL parser
    }
    catch {
        throw new Error(`${label} is not a valid URL: ${value}`);
    }
}
function getConfig() {
    if (!config) {
        throw new Error('sanctum-client not initialised. Call initSanctum({ url, websocketUrl? }).');
    }
    return config;
}
function setConfig(c) {
    if (config) {
        throw new Error('sanctum-client already initialised; initSanctum must be called only once.');
    }
    if (c.url && !c.websocketUrl) {
        c.websocketUrl = c.url.replace(/^http/, 'ws');
    }
    assertUrl('url', c.url);
    assertUrl('websocketUrl', c.websocketUrl);
    config = c;
}

export { getConfig, setConfig };
//# sourceMappingURL=config.js.map

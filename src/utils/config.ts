export const config = {
	SANCTUM_URL: process.env.SANCTUM_URL as string,
	SANCTUM_WS_URL: process.env.SANCTUM_WS_URL as string,
};

// Validate config at build time
Object.entries(config).forEach(([key, value]) => {
	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
}); 
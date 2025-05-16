export interface SanctumConfig {
	url: string;
	websocketUrl: string;
}


let config: SanctumConfig | null = null;


function assertUrl(label: string, value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error(`${label} must be a string`);
  try {
    new URL(value);                // built-in URL parser
  } catch {
    throw new Error(`${label} is not a valid URL: ${value}`);
  }
}


export function getConfig(): SanctumConfig {
  if (!config) {
    throw new Error(
      'sanctum-client not initialised. Call initSanctum({ SANCTUM_URL, SANCTUM_WS_URL }).'
    );
  }
  return config;
}


export function setConfig(c: Partial<SanctumConfig>): void {
  if (config) {
    throw new Error('sanctum-client already initialised; initSanctum must be called only once.');
  }
  if (c.url && !c.websocketUrl) {
    c.websocketUrl = c.url.replace(/^http/, 'ws');
  }

  assertUrl('url',    c.url);
  assertUrl('websocketUrl', c.websocketUrl);



  config = c as SanctumConfig;
}
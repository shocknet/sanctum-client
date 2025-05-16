export interface SanctumConfig {
    url: string;
    websocketUrl: string;
}
export declare function getConfig(): SanctumConfig;
export declare function setConfig(c: Partial<SanctumConfig>): void;

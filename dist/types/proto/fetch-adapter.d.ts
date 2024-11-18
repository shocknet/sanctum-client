type HttpResponse = {
    data: any;
};
export declare const fetchAdapter: {
    get: (url: string, config?: {
        headers?: Record<string, string>;
    }) => Promise<HttpResponse>;
    post: (url: string, data?: any, config?: {
        headers?: Record<string, string>;
    }) => Promise<HttpResponse>;
};
export {};

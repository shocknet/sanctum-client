// Mimics axios-like response structure
async function fetchWithAxiosStructure(url, options) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
}
// Create axios-like interface using fetch
const fetchAdapter = {
    get: async (url, config) => {
        return fetchWithAxiosStructure(url, {
            method: 'GET',
            headers: config?.headers,
        });
    },
    post: async (url, data, config) => {
        return fetchWithAxiosStructure(url, {
            method: 'POST',
            headers: config?.headers,
            body: JSON.stringify(data),
        });
    },
};

export { fetchAdapter };
//# sourceMappingURL=fetch-adapter.js.map

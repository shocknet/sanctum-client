type HttpResponse = {
	data: any;
};

// Mimics axios-like response structure
async function fetchWithAxiosStructure(
	url: string,
	options: RequestInit
): Promise<HttpResponse> {
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
export const fetchAdapter = {
	get: async (url: string, config?: { headers?: Record<string, string> }): Promise<HttpResponse> => {
		return fetchWithAxiosStructure(url, {
			method: 'GET',
			headers: config?.headers,
		});
	},

	post: async (
		url: string,
		data?: any,
		config?: { headers?: Record<string, string> }
	): Promise<HttpResponse> => {
		return fetchWithAxiosStructure(url, {
			method: 'POST',
			headers: config?.headers,
			body: JSON.stringify(data),
		});
	},
}; 
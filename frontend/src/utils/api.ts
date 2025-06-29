export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api';

export async function safeFetch(url: string, options?: RequestInit) {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include"
        });
        return await handleResponse(response);
    } catch (error: any) {
        throw new Error(error.message || "Network error. Please check your connection.");
    }
}

export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

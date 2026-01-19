import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://newapi.nepalailab.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkHealth = async () => {
    try {
        const response = await api.get('health/');
        return response.data;
    } catch (error) {
        console.error('API Health Check Failed:', error);
        throw error;
    }
};

export default api;

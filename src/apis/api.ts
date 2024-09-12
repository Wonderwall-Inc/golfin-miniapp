// api.ts

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: apiUrl, // Update this if your FastAPI server is running on a different URL
});
export default api;
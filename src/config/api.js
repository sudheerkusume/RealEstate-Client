import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://realestate-server-9xji.onrender.com",
});

// Auto-attach auth token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

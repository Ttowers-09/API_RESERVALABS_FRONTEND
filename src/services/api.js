import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cvds-backenddespliegue2025-crgndqe4dkgwd0dc.eastus-01.azurewebsites.net',
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    
    if (token && !config.url.includes('/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

let accessToken = null;

export const setApiAccessToken = (token) => { accessToken = token; };

const api = axios.create({
  baseURL: BASE_URL || '/',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log('No accessToken, no Authorization header added');
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API Response Error:', error.response?.status, error.response?.data);
    const originalRequest = error.config;

    const isAuthRoute = originalRequest.url?.includes('/auth/');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
  
        setApiAccessToken(res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log('Refresh failed:', refreshError.response?.status, refreshError.response?.data);
        setApiAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "";

let accessToken = null;

export const setApiAccessToken = (token) => { accessToken = token; };

const api = axios.create({
  baseURL: BASE_URL || undefined,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute = originalRequest.url?.includes('/auth/');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh');
        const refreshedToken = res.data?.accessToken;

        if (!refreshedToken) {
          throw new Error('Refresh response did not include an access token');
        }

        setApiAccessToken(refreshedToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${refreshedToken}`,
        };
        return api(originalRequest);
      } catch (refreshError) {
        setApiAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
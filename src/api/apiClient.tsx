// src/api/apiClient.ts

import axios from 'axios';

let appId: string | null = null;
let visitorId: string | null = null;
let accessTokenOverride: string | null = null;

export const setApiContext = ({
    _appId,
    _visitorId,
    _accessToken,
}: {
    _appId?: string | null;
    _visitorId?: string | null;
    _accessToken?: string | null;
}) => {
    if (_appId !== undefined) appId = _appId;
    if (_visitorId !== undefined) visitorId = _visitorId;
    if (_accessToken !== undefined) accessTokenOverride = _accessToken;
};

export const getApiContext = () => ({
    appId,
    visitorId,
    accessToken: accessTokenOverride || localStorage.getItem('pr0d:access_token'),
});

const apiClient = axios.create({
    baseURL: 'https://auth.pr0d.io/api/',
    timeout: 10000,
});

// 🔐 Request Interceptor
apiClient.interceptors.request.use((config) => {
    const token = accessTokenOverride || localStorage.getItem('pr0d:access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (appId) {
        config.headers['pr0d-app-id'] = appId;
    }
    if (visitorId) {
        config.headers['pr0d-visitor-id'] = visitorId;
    }
    return config;
});

// 🔄 Response Interceptor (401 token refresh logic)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            error.response.config.url?.includes('auth.pr0d.io')
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('pr0d:refresh_token');
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post(
                        'https://auth.pr0d.io/api/sessions/refresh',
                        { refresh_token: refreshToken }
                    );

                    const newAccessToken = refreshResponse.data.access_token;
                    localStorage.setItem('pr0d:access_token', newAccessToken);
                    accessTokenOverride = newAccessToken;

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('pr0d:access_token');
                    localStorage.removeItem('pr0d:refresh_token');

                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }

                    return Promise.reject(refreshError);
                }
            } else {
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

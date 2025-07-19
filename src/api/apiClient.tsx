// src/api/apiClient.ts

import axios from 'axios';

let appId: string | null = null;
let visitorId: string | null = null;

// Add refresh token lock to prevent race conditions
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}> = [];

// Add callback for token refresh notifications
let onTokenRefresh: ((accessToken: string, refreshToken: string) => void) | null = null;

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    
    failedQueue = [];
};

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
    if (_accessToken !== undefined && _accessToken !== null) {
        console.log('[API Context] Setting access token:', _accessToken.substring(0, 10) + '...');
        localStorage.setItem('pr0d:access_token', _accessToken);
    }
};

// Add function to set token refresh callback
export const setTokenRefreshCallback = (callback: (accessToken: string, refreshToken: string) => void) => {
    onTokenRefresh = callback;
};

export const getApiContext = () => ({
    appId,
    visitorId,
    accessToken: localStorage.getItem('pr0d:access_token'),
});

const apiClient = axios.create({
    baseURL: 'https://auth.pr0d.io/api/',
    timeout: 10000,
});

// 🔐 Request Interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('pr0d:access_token');
    if (token) {
        console.log('[API Request] Using token:', token.substring(0, 10) + '...', 'for URL:', config.url);
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

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            (error.response.config.url?.includes('auth.pr0d.io') ||
                error.response.config.baseURL?.includes('auth.pr0d.io'))
        ) {
            if (originalRequest.url?.includes('/sessions/refresh')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('pr0d:refresh_token');
            
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post(
                        'https://auth.pr0d.io/api/sessions/refresh',
                        { refresh_token: refreshToken },
                        {
                            headers: {
                                'pr0d-app-id': appId,
                                'pr0d-visitor-id': visitorId,
                            }
                        }
                    );

                    const newAccessToken = refreshResponse.data.data.access_token;
                    const newRefreshToken = refreshResponse.data.data.refresh_token;
                    localStorage.setItem('pr0d:access_token', newAccessToken);
                    localStorage.setItem('pr0d:refresh_token', newRefreshToken);

                    // Notify component about token refresh
                    if (onTokenRefresh) {
                        console.log('[API Client] Token refreshed, notifying component');
                        onTokenRefresh(newAccessToken, newRefreshToken);
                    }

                    // Process queued requests with new token
                    processQueue(null, newAccessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Process queued requests with error
                    processQueue(refreshError, null);
                    
                    localStorage.removeItem('pr0d:access_token');
                    localStorage.removeItem('pr0d:refresh_token');

                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                isRefreshing = false;
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

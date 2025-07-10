export const storeTokens = (access: string, refresh: string) => {
    localStorage.setItem('pr0d:access_token', access);
    localStorage.setItem('pr0d:refresh_token', refresh);
};

export const clearTokens = () => {
    localStorage.removeItem('pr0d:access_token');
    localStorage.removeItem('pr0d:refresh_token');
};

export const getAccessToken = () => {
    return localStorage.getItem('pr0d:access_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('pr0d:refresh_token');
};
import axios from 'axios';

const DEV_BASE_URL = 'http://localhost:8080';
const PROD_BASE_URL = 'https://cellabor-express-2dfb48949b8f.herokuapp.com';

const axiosInstance = axios.create({
    //바꾸고 지워
    baseURL: process.env.NODE_ENV === '!development' ? DEV_BASE_URL : PROD_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

function getCookie(name: string): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

axiosInstance.interceptors.request.use((config) => {
    const locale = getCookie('i18nlang') || 'en';
    config.headers['Accept-Language'] = locale;

    return config;
}, (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
});

export default axiosInstance;

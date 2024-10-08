import axiosInstance from '../axiosInstance';
import {UserFBAuthInfoInterface} from '@repo/types';
import * as process from 'node:process';

export const authApi = {
    register: async (userData: UserFBAuthInfoInterface) => {
        try {
            console.log(userData,'auth api data')
            const response = await axiosInstance.post('/user/signUp', userData);
            console.log(response.data,'auth api data')
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    instagram: async () => {
        const REDIRECT_URI = 'http://localhost:3000/instagram/callback'; // 클라이언트의 콜백 URL

        const authUrl =
            'https://www.facebook.com/v21.0/dialog/oauth?' +
            `client_id=${process.env.NEXT_PUBLIC_BUSINESS_FACEBOOK_APP_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            '&state={st=state123abc,ds=123456789}' +
            '&scope=pages_show_list,instagram_basic';
        window.location.href = authUrl;

    }
};

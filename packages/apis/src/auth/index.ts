import axiosInstance from '../axiosInstance';
import {UserFBAuthInfoInterface} from '@repo/types';

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
    instagramGetUrl: async () => {
        try{
            const response = await axiosInstance.get('/instagram/auth');
            return response.data;
        }catch (err){
            console.error('Error fetching post details:', err);
        }
    }
};

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

};

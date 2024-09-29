import axiosInstance from '../axiosInstance';

export const userApi = {
    fetchProfileData: async (uid: string) => {
        try {
            const response = await axiosInstance.get(`/user/fetchProfile/${uid}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },
}

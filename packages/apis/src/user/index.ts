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
    updateUserProfile: async (uid:string, updatedData:any) => {
        try {
            const response = await axiosInstance.put(`/user/updateUserProfile/${uid}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}

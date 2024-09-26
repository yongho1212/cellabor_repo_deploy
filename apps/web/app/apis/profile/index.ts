import instance from '../instance';

export const profileApi = {
    fetchProfileData: async (uid: string) => {
        try {
            const response = await instance.get(`/user/fetchProfile/${uid}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },
}

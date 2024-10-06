import axiosInstance from '../axiosInstance';

export const postsApi = {
    fetchPosts: async (query: string, filters: string[], page: number = 1, limit: number = 10) => {
        try {
            const response = await axiosInstance.get('/posts', {
                params: { query, filters, page, limit }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    fetchPostById: async (postId: string) => {
        try {
            const response = await axiosInstance.get(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post details:', error);
            throw error;
        }
    },
}

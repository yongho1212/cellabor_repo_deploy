import axiosInstance from '../axiosInstance';
import { PostInterface } from '@repo/types';
export const postsApi = {
    // 게시물 목록 가져오기
    fetchPosts: async (
        query: string,
        filters: string[],
        page: number = 1,
        limit: number = 10
    ): Promise<PostInterface[]> => {
        try {

            const response = await axiosInstance.get('/post', {
                params: { q: query, filter: filters, page, limit },
            });

            const searchResults = response.data;

            if (!Array.isArray(searchResults)) {
                throw new Error(`Expected an array but got: ${typeof searchResults}`);
            }

            // 데이터 타입 안전하게 변환
            return searchResults.map((result) => ({
                id: result.id,
                title: result.title || '',
                content: result.content || '',
                author: result.author || { id: '', name: 'Unknown', avatar: '' },
                openKakaoTalkLink: result.openKakaoTalkLink || '',
                createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
                limitApplicant: result.limitApplicant || 0,
                endDate: result.endDate ? new Date(result.endDate) : new Date(),
                closed: result.closed || false,
                type: result.type || 'ACTIVE',
                viewCount: result.viewCount || 0,
                modifiedAt: result.modifiedAt ? new Date(result.modifiedAt) : new Date(),
                isTemporary: result.isTemporary || false,
                thumbnail: result.thumbnail || '',
                limitUserCount: result.limitUserCount || 0,
                appliedUserIds: result.appliedUserIds || [],
                matchedUserIds: result.matchedUserIds || [],
                location: result.location || '',
                hashTags: result.hashTags || [],
                meetingDate: result.meetingDate ? new Date(result.meetingDate) : new Date(),
                place: result.place || [],
                day: result.day || [],
                images: result.images || [],
            }));
        } catch (error: any) {
            console.error('Error fetching posts:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
            throw new Error('Failed to fetch posts');
        }
    },

    // 특정 게시물 상세 정보 가져오기
    fetchPostById: async (postId: string): Promise<PostInterface> => {
        try {
            const response = await axiosInstance.get(`/post/${postId}`);
            console.log(response.data); // 서버 응답 데이터 확인

            const post: PostInterface = response.data;
            return post;
        } catch (error: any) {
            console.error('Error fetching post details:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
            throw new Error('Failed to fetch post details');
        }
    },

    // 게시물 생성
    createPost: async (newPost: Omit<PostInterface, 'id'>): Promise<string> => {
        try {
            const response = await axiosInstance.post('/post', newPost);

            console.log('Post created successfully:', response.data);
            return response.data.id; // 서버에서 반환된 게시물 ID
        } catch (error: any) {
            console.error('Error creating post:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
            throw new Error('Failed to create post');
        }
    },
};

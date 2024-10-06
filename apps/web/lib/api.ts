import { PostInterface } from '@repo/types';
import { mockPosts } from './mockData';

export async function fetchPosts(query: string, filters: string[]): Promise<PostInterface[]> {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockPosts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase());

        const matchesFilters = filters.length === 0 || filters.every(filter => {
            switch (filter) {
                case '지역':
                    return post.location !== '';
                case '요일':
                    return post.hashTags.some(tag => ['월', '화', '수', '목', '금', '토', '일'].includes(tag));
                case '시간대':
                    return post.meetingDate !== null;
                case '실내/실외':
                    return post.place.length > 0;
                case '장소':
                    return post.place.length > 0;
                default:
                    return true;
            }
        });

        return matchesQuery && matchesFilters;
    });
}

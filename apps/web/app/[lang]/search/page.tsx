import { Metadata } from 'next';
import PostCard from '@repo/ui/components/PostCard/PostCard';
import Link from 'next/link';
import { postsApi } from '@repo/apis'
import { PostInterface } from '@repo/types/src';

export const metadata: Metadata = {
    title: '검색 결과',
    description: '게시글 검색 결과 페이지입니다.',
};



export default async function Search({
    searchParams,
}: {
    searchParams: { q: string, filter: string | string[] };
}) {
    const query = searchParams.q || '';
    const filters = Array.isArray(searchParams.filter) ? searchParams.filter : [searchParams.filter].filter(Boolean);

    const searchResults = await postsApi.fetchPosts(query, filters);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">검색 결과: {searchResults.length}개</h2>
            {searchResults.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} className="block w-full cursor-pointer">
                    <div className="border-b-2 mb-4">
                        <PostCard post={post} environment="desktop" backgroundColor="#fff" isList={true} />
                    </div>
                </Link>
            ))}
        </div>
    );
}


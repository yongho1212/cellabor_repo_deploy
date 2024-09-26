import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '검색 결과',
    description: '게시글 검색 결과 페이지입니다.',
}

async function searchPosts(query: string) {
    // 여기서 실제 검색 로직을 구현합니다
    return [
        { id: 1, title: '검색 결과 1' },
        { id: 2, title: '검색 결과 2' },
    ]
}

export default async function Search({
                                         searchParams
                                     }: {
    searchParams: { q: string }
}) {
    const query = searchParams.q
    const searchResults = await searchPosts(query)

    return (
        <div>
            <h1>검색 결과: {query}</h1>
            <ul>
                {searchResults.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

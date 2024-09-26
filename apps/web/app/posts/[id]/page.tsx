import Image from 'next/image'
import Link from 'next/link'
import { mockPosts } from '../../../lib/mockData'
import { notFound } from 'next/navigation'

export default function PostDetail({ params }: { params: { id: string } }) {
    const post = mockPosts.find(p => p.id === params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-16">
            <header className="bg-white p-4 flex items-center justify-between">
                <Link href="/" className="text-2xl">← 전체글</Link>
                <button className="text-primary">공유</button>
            </header>

            <main className="max-w-screen-sm mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

                <div className="flex items-center mb-4">
                    <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full mr-2" />
                    <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{post.createdAt} · 조회 {post.views}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="mb-2"><span className="font-semibold">위치:</span> {post.location}</p>
                    <p className="mb-2">
                        <span className="font-semibold">요일:</span>
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-block bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs mr-1">{tag}</span>
                        ))}
                    </p>
                    <p className="mb-2"><span className="font-semibold">시간:</span> {post.time}</p>
                    <p className="mb-2">
                        <span className="font-semibold">성별:</span>
                        {post.gender.map(g => (
                            <span key={g} className="inline-block bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs mr-1">{g}</span>
                        ))}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">나이:</span>
                        {post.age.map(a => (
                            <span key={a} className="inline-block bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs mr-1">{a}</span>
                        ))}
                    </p>
                </div>

                <div className="mb-6 whitespace-pre-wrap">{post.content}</div>

                <div className="grid grid-cols-2 gap-2">
                    {post.images.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                            <Image src={img} alt={`게시글 이미지 ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                        </div>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-screen-sm mx-auto flex justify-between items-center">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">좋아요</button>
                    <button className="bg-primary text-white px-4 py-2 rounded-full">활동메이트 신청하기</button>
                </div>
            </footer>
        </div>
    )
}

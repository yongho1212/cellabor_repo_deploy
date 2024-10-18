import Image from 'next/image';
import { notFound } from 'next/navigation';
import { timeAgo } from '@repo/utils';
import { postsApi } from '@repo/apis'

import React from 'react';
import Link from 'next/link';

export default async function PostDetail({ params }: { params: { id: string } }) {
    const post = await postsApi.fetchPostById(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-16">

            <main className="max-w-screen-sm mx-auto px-4 py-6 mb-16">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <button className="text-primary">공유</button>
                </div>
                <Link href={`/profile/${post.author.id}`} className="flex items-center mb-4">
                    <Image src={post.author.avatar || '/place-holder.svg'} alt="작성자 아바타" width={40} height={40}
                        className="rounded-full mr-2" />
                    <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{timeAgo(post.createdAt)} · 조회 {post.viewCount}</p>
                    </div>
                </Link>

                <div className="mb-6 space-y-2">
                    <p><span className="font-semibold">위치:</span> {post.location}</p>
                    <p>
                        <span className="font-semibold">요일:</span>
                        {post.hashTags.map(tag => (
                            <span key={tag}
                                className="inline-block bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs mr-1">{tag}</span>
                        ))}
                    </p>
                    <p>
                        <span
                            className="font-semibold">시간:</span> {new Date(post.meetingDate).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                    </p>
                    <p><span className="font-semibold">장소:</span> {post.place.join(', ')}</p>
                </div>

                <div className="mb-6 whitespace-pre-wrap">{post.content}</div>
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                    {post.images && post.images.map((item, index) => {
                        return (
                            <div key={index} className="relative w-[120px] h-[120px] bg-gray-200 overflow-hidden">
                                <Image
                                    src={item || "/place_profile.svg"}
                                    alt="image"
                                    layout="fill"
                                    objectFit="cover"
                                    sizes="(max-width: 120px) 100vw, 33vw"
                                />
                            </div>
                        );
                    })}
                </div>
            </main>

            <footer className="fixed bottom-16 left-0 right-0 bg-white p-4">
                <div className="max-w-screen-sm mx-auto flex justify-between items-center gap-2">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">좋아요</button>
                    <button className="bg-primary text-white px-4 py-2 rounded-full flex-grow">
                        활동메이트 신청하기
                    </button>
                </div>
            </footer>
        </div>
    );
}

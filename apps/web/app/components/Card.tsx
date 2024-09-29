import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../lib/mockData'

interface CardProps {
    post: Post;
}

export default function Card({ post }: CardProps) {
    return (
        <Link href={`/posts/${post.id}`} className="block w-full z-10">
            <div className="bg-white rounded-lg shadow-md overflow-hidden z-10">
                <div className="relative w-full pt-[66.67%] z-10"> {/* 3:2 aspect ratio */}
                    <Image
                        src={post.images[0] as string}
                        alt={post.title}
                        fill
                        style={{zIndex:10}}
                        // sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{post.location}</p>
                    <p className="text-sm text-gray-500 mb-2">{post.time}</p>
                    <div className="flex flex-wrap mb-2">
                        {post.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs mr-1 mb-1">
                {tag}
              </span>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

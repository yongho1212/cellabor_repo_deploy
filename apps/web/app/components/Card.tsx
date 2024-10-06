// import Link from 'next/link'
// import Image from 'next/image'
// import { PostInterface } from '../../lib/mockData'
// import { timeAgo } from '@repo/utils';
//
// interface CardProps {
//     post: PostInterface;
// }
//
// export default function Card({ post }: CardProps) {
//     return (
//         <Link href={`/posts/${post.id}`} className="block w-full cursor-pointer">
//             <div className="bg-gray-100 rounded-lg p-4 overflow-hidden flex flex-col h-full" style={{ width: '100%', }}>
//                 <h3 className="text-lg font-semibold mb-2 line-clamp-1 sm:line-clamp-2 overflow-ellipsis">{post.title}</h3>
//                 <div className="flex-grow flex flex-col justify-between">
//                     <div className='flex flex-col sm:flex-row justify-between gap-4 mb-2'>
//                         <div className="flex-grow flex-shrink min-w-0 relative bg-transparent">
//                             <p className="text-sm text-gray-600 break-words line-clamp-2 sm:line-clamp-3 overflow-ellipsis">{post.content}</p>
//                         </div>
//                         <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
//                             <Image
//                                 src={post.images[0] as string}
//                                 alt={post.title}
//                                 fill
//                                 className="object-cover rounded-md"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="text-xs text-gray-500 mt-auto">
//                         <div className="flex flex-wrap mb-1 pb-1 border-b-gray-300 border-b-2">
//                             {post.tags.slice(0, 2).map((tag) => (
//                                 <span key={tag} className="bg-red-200 text-red-700 rounded-full px-2 py-1 text-xs mr-1 mb-1">
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                         <div className='flex flex-row justify-between items-center'>
//                             <div className="flex items-center">
//                                 <Image
//                                     src={post.author.avatar}
//                                     alt={post.author.name}
//                                     width={20}
//                                     height={20}
//                                     className="rounded-full mr-1"
//                                 />
//                                 <span>{post.author.name}</span>
//                             </div>
//                             <div className="flex items-center">
//                                 <span>{timeAgo(post.createdAt)}</span>
//                                 <span className='mx-1'> | </span>
//                                 <span>조회수 {post.views}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

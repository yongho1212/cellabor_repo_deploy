import Card from './components/Card'
import NavBar from './components/NavBar'
import Link from 'next/link';
import Image from 'next/image';
import {mockPosts} from '../lib/mockData';

import Typography from '@repo/ui/components/Typography/Typography';

export default function Home() {
    return (
        <div className="min-h-screen bg-background pb-16">
            <main className="max-w-screen-sm mx-auto px-4">
                <section className="py-4WE">
                    <h2 className="text-xl font-bold mb-4">어떤 활동메이트를 구하시나요?</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {['여행', '맛집', '운동', '스터디', '쇼핑', '취미', '관람/체험', '기타/자유'].map((item) => (
                            <button key={item} className="bg-white rounded-full py-2 px-4 text-sm shadow">
                                {item}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="py-4">
                    <h2 className="text-xl font-bold mb-4">내 스타일과 비슷한 메이트를 만나볼까요?</h2>
                    <Typography variant={'text1'}>내 스타일과 비슷한 메이트를 만나볼까요?</Typography>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {mockPosts.map((post) => (
                            <Card key={post.id} post={post}/>
                        ))}
                    </div>
                </section>

                <section className="py-4">
                    <h2 className="text-xl font-bold mb-4">이벤트</h2>
                    <div className="bg-gray-200 h-40 rounded-lg"></div>
                </section>

                <section className="py-4">
                    <h2 className="text-xl font-bold mb-4">최신글/인기글 모음</h2>
                    <div className="bg-gray-200 h-60 rounded-lg"></div>
                </section>

                <section className="py-4">
                    <h2 className="text-xl font-bold mb-4">푸터영역</h2>
                    <div className="bg-gray-200 h-20 rounded-lg"></div>
                </section>
            </main>

            {/*<NavBar/>*/}
        </div>
    )
}

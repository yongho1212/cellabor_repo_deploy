import {mockPosts} from '../lib/mockData';
import Image from 'next/image';

import Typography from '@repo/ui/components/Typography/Typography';
import FlickingSlider from './components/Slider';

export default function Home() {
    return (
        <div className="min-h-screen bg-background pb-16">
            <main className="w-full mx-auto px-4 ">
                <section className=" py-10">
                    <h2 className="text-xl font-bold mb-8 text-center">어떤 활동메이트를 구하시나요?</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {['서울권', '평일', '전시회', '스튜디오 쉐어', '호텔/라운지', '수영장', '카페', '공원/야외'].map((item) => (
                            <button key={item} className="py-1 px-2 flex flex-col items-center">
                                <div className="border-2 w-16 h-16 flex items-center justify-center relative mb-1">
                                    <Image src='next.svg' alt='logo' fill/>
                                </div>
                                <span>{item}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="py-4 ">
                    <Typography variant={'standardTitle'}>내 스타일과 비슷한 메이트를 만나볼까요?</Typography>
                    {/*<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 z-10">*/}
                    <div className="-mx-8 ">
                        {/*{mockPosts.map((post) => (*/}
                        {/*    <Card key={post.id} post={post}/>*/}
                        {/*))}*/}
                        <FlickingSlider posts={mockPosts}/>
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

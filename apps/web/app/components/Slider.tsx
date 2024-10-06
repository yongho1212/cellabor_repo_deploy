"use client";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import '@egjs/react-flicking/dist/flicking.css';
import PostCard from '@repo/ui/components/PostCard/PostCard'
import {PostInterface} from '@repo/types';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FlickingSliderProps {
    posts: PostInterface[];
}

export default function FlickingSlider({ posts }: FlickingSliderProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Flicking
            // align={isMobile ? 'center' : 'prev'}
            align='center'
            circular={true}
            panelsPerView={isMobile ? 1.2 : 1.6}
            moveType="snap"
            // bound={true}
            // renderOnlyVisible={true}
            // adaptive={true}
            preventDefaultOnDrag={true}
            easing={function(x) { return 1 - Math.pow(1 - x, 3); }}
            duration={500}
            // classPrefix="flicking"
            deceleration={0.0075}
            horizontal={true}

        >
            <ViewportSlot>
                <div className="flicking-arrow-prev"></div>
                <div className="flicking-arrow-next"></div>
            </ViewportSlot>

            {posts.map((post) => (
                <div key={post.id} className="flicking-panel" style={{ padding: '0 10px' }}>
                    <Link href={`/posts/${post.id}`} className="cursor-pointer">
                        <PostCard post={post} environment={isMobile ? "mobile" : "desktop"} />
                    </Link>
                </div>
            ))}
        </Flicking>
    );
}

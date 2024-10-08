"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '@repo/apis/src/axiosInstance';

interface PageProps {
    id: string;
    name: string;
}

const InstagramCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('처리 중...');
    const [pages, setPages] = useState<PageProps[]>([]);
    const [accessToken, setAccessToken] = useState('');
    const [selectedPageId, setSelectedPageId] = useState('');

    // const pages = [
    //     {
    //         id:'1',
    //         name:'1111'
    //     },
    //     {
    //         id:'2',
    //         name:'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁ'
    //     }
    // ]

    useEffect(() => {
        const fetchData = async () => {
            const code = searchParams.get('code');

            if (code) {
                try {
                    setStatus('인증 코드 교환 중...');
                    const response = await axiosInstance.post('/instagram/exchangeCode', { code });
                    console.log('Instagram data:', response.data);
                    setStatus('Facebook 페이지를 가져왔습니다. 페이지를 선택하세요.');
                    setPages(response.data.pages);
                    setAccessToken(response.data.accessToken);
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    setStatus('인증 실패. 다시 시도해주세요.');
                }
            } else {
                console.error('No code found in URL');
                setStatus('인증 코드를 찾을 수 없습니다.');
            }
        };

        fetchData();
    }, [searchParams, router]);

    const handlePageSelect = async () => {
        if (!selectedPageId) {
            alert('페이지를 선택하세요.');
            return;
        }

        try {
            setStatus('Instagram 계정 정보를 가져오는 중...');
            const response = await axiosInstance.post('/instagram/getInstagramData', {
                accessToken,
                pageId: selectedPageId,
            });
            console.log('Instagram Data:', response.data);
            setStatus('Instagram 데이터 가져오기 성공!');
            //!!TODO
        } catch (error) {
            console.error('Error fetching Instagram data:', error);
            setStatus('Instagram 데이터 가져오기 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <p>{status}</p>
            {pages.length > 0 && (
                <div className="w-full ">
                    <h3 className="text-lg font-semibold mb-4">Facebook 페이지 선택:</h3>
                    <div className="space-y-2 mb-10">
                        {pages.map((page) => (
                            <label key={page.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="facebookPage"
                                    value={page.id}
                                    checked={selectedPageId === page.id}
                                    onChange={(e) => setSelectedPageId(e.target.value)}
                                    className="form-radio h-4 w-4 text-primary"
                                />
                                <div className={'flex items-center space-x-2 p-4 border-2 rounded-lg w-full'}>
                                    <span>{page.name}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handlePageSelect}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg m-auto font-semibold"
                        >
                            선택한 페이지로 진행
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstagramCallback;


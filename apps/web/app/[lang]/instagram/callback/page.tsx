"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '@repo/apis/src/axiosInstance';
import withAuth from '../../../components/withAuth';
import { useAuth } from '../../../providers/AuthProvider';
import Loading from '../../../components/Loading';
import Link from 'next/link';

interface PageProps {
    id: string;
    name: string;
}

const InstagramCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState({ code: 0, message: '처리 중...' });
    const [pages, setPages] = useState<PageProps[]>([]);
    const [accessToken, setAccessToken] = useState('');
    const [selectedPageId, setSelectedPageId] = useState('');
    const { user, loading } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const code = searchParams.get('code');

            if (code) {
                try {
                    setStatus({ code: 0, message: '인증 코드 교환 중...' });
                    const response = await axiosInstance.post('/instagram/exchangeCode', { code });

                    if (response.status === 200 && response.data.pages && response.data.pages.length > 0) {
                        setStatus({ code: 1, message: 'Facebook 페이지를 가져왔습니다. 페이지를 선택하세요.' });
                        setPages(response.data.pages);
                        setAccessToken(response.data.accessToken);
                    } else if (response.status === 204) {
                        // 페이지가 없는 경우 상태 메시지 업데이트 및 리디렉션
                        setStatus({ code: 2, message: response.data.message || '연결된 인스타그램/페이스북 페이지가 없습니다.' });
                        setTimeout(() => {
                            router.push('/');
                        }, 3000); // 3초 후 메인으로 이동
                    }
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    setStatus({ code: 2, message: '인증 실패. 다시 시도해주세요.' });
                    setTimeout(() => {
                        router.push('/');
                    }, 3000); // 3초 후 메인으로 이동
                }
            } else {
                console.error('No code found in URL');
                setStatus({ code: 2, message: '인증 코드를 찾을 수 없습니다.' });
                setTimeout(() => {
                    router.push('/');
                }, 3000); // 3초 후 메인으로 이동
            }
        };

        fetchData();
    }, [searchParams, router]);


    const handlePageSelect = async () => {
        if (!selectedPageId) {
            alert('페이지를 선택하세요.');
            return;
        }
        if (!user && loading) {
            alert('유저 정보를 받아오는 중입니다. 잠시만 기다려주세요.');
            return;
        }

        try {
            setStatus({ code: 0, message: 'Instagram 계정 정보를 가져오는 중...' });
            const response = await axiosInstance.post('/instagram/getInstagramData', {
                accessToken: accessToken,
                pageId: selectedPageId,
                uid: user?.uid,
            });
            if (response.status === 200) {
                setStatus({ code: 1, message: 'Instagram 데이터 가져오기 성공!' });
                router.push('/');
            }
        } catch (error) {
            console.error('Error fetching Instagram data:', error);
            setStatus({ code: 2, message: 'Instagram 데이터 가져오기 실패. 다시 시도해주세요.' });
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (status.code === 2 && pages.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h1 className="text-2xl font-bold mb-4">{status.message}</h1>
                <h2 className="text-lg mb-6">연결하는 계정이 프로페셔널 계정인지 확인해주세요</h2>
                <h2 className="text-lg mb-6">잠시후 다시 시도해주세요!</h2>
                <Link href={'/'} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                    메인으로
                </Link>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-cente'>
            <p className="text-xl mb-6">{status.message}</p>
            {pages.length > 0 && (
                <div className="w-full max-w-md">
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
                    <div className="flex justify-center">
                        <button
                            onClick={handlePageSelect}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold"
                        >
                            선택한 페이지로 진행
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default withAuth(InstagramCallback);

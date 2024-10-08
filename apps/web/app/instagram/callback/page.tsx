"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '@repo/apis/src/axiosInstance';

const InstagramCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('처리 중...');

    useEffect(() => {
        const fetchData = async () => {
            const error = searchParams.get('error');
            const errorCode = searchParams.get('error_code');
            const errorMessage = searchParams.get('error_message');

            // 에러가 있는 경우 처리
            if (error || errorCode) {
                console.error('Authentication error:', errorMessage || 'Unknown error');
                setStatus('인증 실패. 메인 화면으로 이동합니다.');
                setTimeout(() => router.push('/'), 3000); // 3초 후 메인 화면으로 이동
                return;
            }

            const code = searchParams.get('code');

            if (code) {
                try {
                    setStatus('인증 코드 교환 중...');
                    const response = await axiosInstance.post('/instagram/exchangeCode', { code });
                    console.log('Instagram data:', response.data);
                    setStatus('인증 성공!');
                    // 성공 후 처리 (예: 프로필 페이지로 리디렉션)
                    setTimeout(() => router.push('/profile'), 2000);
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    setStatus('인증 실패. 메인 화면으로 이동합니다.');
                    setTimeout(() => router.push('/'), 3000);
                }
            } else {
                console.error('No code found in URL');
                setStatus('인증 코드를 찾을 수 없습니다. 메인 화면으로 이동합니다.');
                setTimeout(() => router.push('/'), 3000);
            }
        };

        fetchData();
    }, [searchParams, router]);

    return <div>{status}</div>;
};

export default InstagramCallback;

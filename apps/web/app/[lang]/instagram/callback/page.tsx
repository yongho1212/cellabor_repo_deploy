"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '@repo/apis/src/axiosInstance';
import withAuth from '../../../components/withAuth';
import { useAuth } from '../../../providers/AuthProvider';
import Loading from '../../../components/Loading';
import Link from 'next/link';
import {useLanguage} from '../../../providers/ClientLanguageProvider';

interface PageProps {
    id: string;
    name: string;
}

const InstagramCallback = () => {
    const { lang, t } = useLanguage();
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
                    setStatus({ code: 0, message: t.instagramCallback.exchangeCode });
                    const response = await axiosInstance.post('/instagram/exchangeCode', { code });

                    if (response.status === 200 && response.data.pages && response.data.pages.length > 0) {
                        setStatus({ code: 1, message: t.instagramCallback.fetchPagesSuccess });
                        setPages(response.data.pages);
                        setAccessToken(response.data.accessToken);
                    } else if (response.status === 204) {
                        setStatus({ code: 2, message: t.instagramCallback.noPages });
                        setTimeout(() => {
                            router.push('/');
                        }, 3000);
                    }
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    setStatus({ code: 2, message: t.instagramCallback.errorExchanging });
                    setTimeout(() => {
                        router.push('/');
                    }, 3000);
                }
            } else {
                console.error('No code found in URL');
                setStatus({ code: 2, message: t.instagramCallback.noCode });
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        };

        fetchData();
    }, [searchParams, router]);


    const handlePageSelect = async () => {
        if (!selectedPageId) {
            alert(t.instagramCallback.selectPage);
            return;
        }
        if (!user && loading) {
            alert(t.instagramCallback.processing);
            return;
        }

        try {
            setStatus({ code: 0, message: t.instagramCallback.fetchingInstagramData });
            const response = await axiosInstance.post('/instagram/getInstagramData', {
                accessToken: accessToken,
                pageId: selectedPageId,
                uid: user?.uid,
            });
            if (response.status === 200) {
                setStatus({ code: 1, message: t.instagramCallback.fetchInstagramSuccess });
                router.push('/');
            }
        } catch (error) {
            console.error('Error fetching Instagram data:', error);
            setStatus({ code: 2, message: t.instagramCallback.fetchInstagramError });
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (status.code === 2 && pages.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h1 className="text-2xl font-bold mb-4">{status.message}</h1>
                <h2 className="text-lg mb-6">{t.instagramCallback.checkProfessionalAccount}</h2>
                <h2 className="text-lg mb-6">{t.instagramCallback.switchToProfessional}</h2>
                <Link href={'/'} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                    {t.instagramCallback.returnToMain}
                </Link>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-cente'>
            <p className="text-xl mb-6">{status.message}</p>
            {pages.length > 0 && (
                <div className="w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-4">{t.instagramCallback.selectPage}</h3>
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
                            {t.instagramCallback.proceed}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default withAuth(InstagramCallback);

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import withAuth from '../components/withAuth';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { userApi, authApi } from '@repo/apis';
import Image from 'next/image';
import Typography from '@repo/ui/components/Typography/Typography';
import {UserFBAuthInfoInterface} from '@repo/types'
import Menu, { MenuItemType } from '../components/Menu';
import Loading from '../components/Loading';
import {data} from 'autoprefixer';
import FacebookLogin from '@greatsumini/react-facebook-login';

const MyProfilePage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [profileData, setProfileData] = useState<UserFBAuthInfoInterface | null>(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [loading, user, router]);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (user) {
                try {
                    const data = await userApi.fetchProfileData(user.uid);
                    setProfileData(data.user);
                } catch (error) {
                    console.error('Failed to fetch profile data:', error);
                }
            }
        };

        fetchProfileData();
    }, [user]);


    const handleFacebookLogin = async (response:any) => {
        console.log('Facebook Login Response:', response);
        if (response.status === 'connected' && response.authResponse) {
            try {
                const { accessToken } = response.authResponse;
                console.log('Firebase login result:', accessToken);
            } catch (error: any) {
                console.error('Firebase Facebook 로그인 실패:', error);
            }
        } else {
            console.error('Facebook 로그인 실패:', response);
        }
    };

    const menuItems: MenuItemType[] = [
        { label: '스타일 관리', action: '/style-management' },
        { label: '1:1 문의', action: '/inquiry' },
        { label: '이용 약관', action: '/terms' },
        { label: '개인정보처리방침', action: '/privacy-policy' },
        { label: '로그아웃', action: handleLogout },
        { label: '회원탈퇴', action: '/unsubscribe' }
    ];

    if (loading || !profileData) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full bg-white rounded-lg ">
                <h1 className=" text-center mb-6">마이페이지</h1>
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24 mb-2">
                        <Image
                            src={profileData.profileImage || "/place_profile.svg"}
                            alt="Profile"
                            layout="fill"
                            className="rounded-full"
                            style={{border:'1px solid #ccc'}}
                        />
                        <div className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1">
                            <span className="text-xs">수정</span>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold">{profileData?.displayName}</h2>
                </div>
                <Typography variant={'sectionTitle'} color={'black'}>인스타그램 연동하기</Typography>
                <div className="mb-6 bg-grey_100 py-[30px] px-5 w-full flex flex-col items-center justify-center gap-8 rounded-2xl">
                    <Image
                        src={"/logos/instagram_logo.svg"}
                        alt="instagram_logo"
                        width={50}
                        height={50}
                    />
                    <Typography variant={'caption'} color={'black'}>인스타그램을 연동하고 나에게 맞는 촬영메이트를 찾아보세요.</Typography>
                    {/*<button className="w-full bg-primary  rounded h-[70px]" onClick={instaInitiate}>*/}
                    {/*    <Typography variant={'body'} color={'white'}>인스타그램 계정 연동하기</Typography>*/}
                    {/*</button>*/}
                    <FacebookLogin
                        appId={process.env.NEXT_PUBLIC_BUSINESS_FACEBOOK_APP_ID!}
                        onSuccess={handleFacebookLogin}
                        onFail={(error) => {
                            console.log('Login Failed!', error);
                        }}
                        onProfileSuccess={(response) => {
                            console.log('Get Profile Success!', response);
                        }}
                        render={({onClick}) => (
                            <button className="w-full bg-primary  rounded h-[70px]" onClick={onClick}>
                                <Typography variant={'body'} color={'white'}>인스타그램 계정 연동하기</Typography>
                            </button>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Menu items={menuItems}/>
                </div>
            </div>
        </div>
    );
}

export default withAuth(MyProfilePage);

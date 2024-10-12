'use client';

import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useProfileData } from '../../../hooks/profileHooks';
import withAuth from '../../../components/withAuth';
import Image from 'next/image';
import Typography from '@repo/ui/components/Typography/Typography';
import Loading from '../../../components/Loading';
import { HiOutlineHeart } from "react-icons/hi";


const UserProfilePage = () => {
    const pathname = usePathname();
    const uid = pathname.split('/').pop(); // URL에서 UID 추출
    const { profileData, isLoading: profileLoading } = useProfileData(uid);

    if (profileLoading) {
        return <Loading />;
    }

    if (!profileData) {
        return <div>프로필 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full bg-white rounded-lg ">
                <div className="flex flex-col items-center mb-6 py-10">
                    <div className="relative w-24 h-24 mb-2">
                        <Image
                            src={profileData.profileImage || "/place_profile.svg"}
                            alt="Profile"
                            fill
                            sizes="(min-width: 380px) 90px 100px"
                            className="rounded-full"
                            style={{ border: '1px solid #ccc' }}
                        />
                    </div>
                    <h2 className="text-xl font-semibold">{profileData?.displayName}</h2>
                    <p className="text-sm text-gray-600">{profileData?.email}</p>
                </div>

                {profileData?.instagram && (
                    <div
                        className="mb-6 bg-grey_100 py-[30px] px-5 w-full flex flex-col items-center justify-center gap-8 rounded-2xl">
                        <Image
                            src={"/logos/instagram_logo.svg"}
                            alt="instagram_logo"
                            width={50}
                            height={50}
                        />
                        <h2 className="text-xl font-semibold">@{profileData?.instagram.userInfo.username}</h2>

                        <div className="grid grid-cols-3 gap-2 w-full">
                            {profileData.instagram.feeds?.data.map((feed: any) => (
                                <div key={feed.id} className="relative pt-[100%] group">
                                    <Image
                                        src={feed.media_url}
                                        alt={feed.caption || 'Instagram post'}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                    <div
                                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-md flex items-center justify-center">
                                        <div
                                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                            <div className='flex flex-row items-center'>
                                                <HiOutlineHeart className="mr-1" size={22}/>
                                                <span className='font-semibold text-lg'>{feed.like_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withAuth(UserProfilePage);

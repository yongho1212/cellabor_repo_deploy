'use client';

import {useCallback, useState} from 'react';
import {useAuth} from '../../providers/AuthProvider';
import withAuth from '../../components/withAuth';
import {userApi} from '@repo/apis';
import {instagramAuthInitiate} from '../../apis/instagram'
import {useProfileData} from '../../hooks/profileHooks';
import {useImageUpload} from '../../hooks/imageHooks';
import Image from 'next/image';
import Typography from '@repo/ui/components/Typography/Typography';
import Menu, {MenuItemType} from '../../components/Menu';
import {getMenuItems} from '../../constants/menuItems'
import Loading from '../../components/Loading';
const LanguageSwitcher = dynamic(() => import('../../components/LanguageSwitch'),{ ssr: false });
import ImageUploaderWithCrop from '../../components/ImageUpload'
import {MdEdit} from "react-icons/md";
import {ImageType} from '../../apis/images';
import {useLanguage} from '../../providers/ClientLanguageProvider';
import dynamic from 'next/dynamic';

const MyProfilePage = () => {
    const { lang, t } = useLanguage();
    const {user, loading: authLoading, handleLogout} = useAuth();
    const {profileData, isLoading: profileLoading, updateProfileData} = useProfileData(user?.uid);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuItems: MenuItemType[] = getMenuItems(t, handleLogout);

    console.log(process.env.NODE_ENV === 'development', process.env.NODE_ENV)

    const handleImageUploadSuccess = useCallback(async (urls: string[]) => {
        if (user?.uid && urls.length > 0) {
            const updatedProfile = await userApi.updateUserProfile(user.uid, {profileImage: urls[0]});
            updateProfileData(updatedProfile.data);
        }
    }, [user?.uid, updateProfileData]);

    const {handleImageUpload, isUpdating: imageUpdating} = useImageUpload({
        uid: user?.uid ?? '',
        type: ImageType.USER,
        onSuccess: handleImageUploadSuccess,
        onError: (error) => console.error('Profile image upload failed:', error)
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    if (authLoading || profileLoading) {
        return <Loading/>;
    }

    if (!profileData) {
        return <div>프로필 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen">
            {imageUpdating && <Loading/>}
            <div className="w-full bg-white rounded-lg ">
                {/*<h1 className="text-center mb-6">{t.mypage.title}</h1>*/}
                <div className="flex flex-col items-center mb-6 py-10">
                    <div className="relative w-24 h-24 mb-2">
                        <Image
                            src={profileData.profileImage || "/place_profile.svg"}
                            alt="Profile"
                            fill
                            sizes="(min-width: 380px) 90px 100px"
                            className="rounded-full"
                            style={{border: '1px solid #ccc'}}
                        />
                        <button
                            className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1"
                            onClick={handleOpenModal}
                        >
                            <MdEdit/>
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold">{profileData?.displayName}</h2>
                </div>
                {!profileData?.instagram && (
                    <Typography variant={'ptd_b_18'} color={'black'}>{t.mypage.igTitle}</Typography>
                )}
                <div
                    className="mb-6 bg-grey_100 py-[30px] px-5 w-full flex flex-col items-center justify-center gap-8 rounded-2xl">
                    <Image
                        src={"/logos/instagram_logo.svg"}
                        alt="instagram_logo"
                        width={50}
                        height={50}
                    />
                    {profileData?.instagram ? (
                        <h2 className="text-xl font-semibold">@{profileData?.instagram.userInfo.username}</h2>
                    ) : (
                        <>
                            <Typography variant={'ptd_b_16'} color={'black'}>{t.mypage.igDesc}</Typography>
                            <button className="w-full bg-primary rounded h-[70px]" onClick={instagramAuthInitiate}>
                                <Typography variant={'ptd_b_18'} color={'white'}>{t.mypage.igButton}</Typography>
                            </button>
                        </>
                    )}
                </div>

                <ImageUploaderWithCrop
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleImageUpload}
                    initialImages={[]}
                />
                <div className="space-y-2">
                    <Menu items={menuItems}/>
                </div>
                <LanguageSwitcher />
            </div>
        </div>
    );
}

export default withAuth(MyProfilePage);

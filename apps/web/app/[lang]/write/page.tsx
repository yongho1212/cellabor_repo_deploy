'use client'

import { PostInterface } from '@repo/types';
import { useAuth } from '../../providers/AuthProvider';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TagItem from '@repo/ui/components/Tag/TagItem';
import withAuth from '../../components/withAuth';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import RegionDialog from '@repo/ui/components/Dialog/RegionDialog';
import ImageUploaderWithCrop from '../../components/ImageUpload'
import { useImageUpload } from '../../hooks/imageHooks';
import { ImageType } from '../../apis/images';
import Image from 'next/image';
import { db } from '../../../firebaseConfig';
import { useLanguage } from '../../providers/ClientLanguageProvider';
import { postsApi } from '@repo/apis'


type TagCategory = 'dayList' | 'placeList' | 'conceptList';

interface SelectedTags {
    dayList: string[];
    placeList: string[];
    conceptList: string[];
}

const MAX_TAGS: { [key in TagCategory]: number | null } = {
    dayList: null,
    placeList: null,
    conceptList: 3,
};


const WritePage = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const { user, loading } = useAuth();
    const [openRegion, setOpenRegion] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [contents, setContents] = React.useState('');
    const [dayList, setDayList] = React.useState<string[]>([]);
    const [placeList, setPlaceList] = React.useState<string[]>([]);
    const [conceptList, setConceptList] = React.useState<string[]>([]);
    const [selectedTags, setSelectedTags] = React.useState<SelectedTags>({
        dayList: [],
        placeList: [],
        conceptList: [],
    });

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [images, setImages] = React.useState<File[]>([]);


    const max_images = 10;
    const localHandleImageUpload = (tempImages: File[]) => {
        if (images.length + tempImages.length > max_images) {
            const temp = tempImages.slice(0, max_images - images.length);
            setImages([...images, ...temp]);
            alert('이미지는 최대 10개까지 업로드 가능합니다.');
        }
        setImages([...images, ...tempImages]);
    };


    const handleImageUploadSuccess = useCallback(
        (urls: string[]) => {
            if (urls.length > 0) {
                const uploadedImages = urls.map((url) => {
                    return new File([], url);
                });

                setImages((prevImages) => [...prevImages, ...uploadedImages]);
            }
        },
        []
    );


    const { handleImageUpload, isUpdating: imageUpdating, deleteImage } = useImageUpload({
        uid: user?.uid ?? '',
        type: ImageType.POST,
        onSuccess: handleImageUploadSuccess,
        onError: (error) => console.error('Profile image upload failed:', error)
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);



    const fetchListsFromFirestore = async () => {
        try {
            const dayListDoc = await getDoc(doc(db, 'filters', 'dayList'));
            const placeListDoc = await getDoc(doc(db, 'filters', 'placeList'));
            const conceptListDoc = await getDoc(doc(db, 'filters', 'conceptList'));

            // 각 문서에서 데이터를 추출하고 상태 업데이트
            setDayList(dayListDoc.exists() ? dayListDoc.data().items || [] : []);
            setPlaceList(placeListDoc.exists() ? placeListDoc.data().items || [] : []);
            setConceptList(conceptListDoc.exists() ? conceptListDoc.data().items || [] : []);
        } catch (error) {
            console.error('Error fetching lists from Firestore:', error);
        }
    };


    React.useEffect(() => {
        fetchListsFromFirestore();
    }, []);

    const toggleTag = (category: TagCategory, tagName: string) => {
        setSelectedTags((prevState) => {
            const isSelected = prevState[category].includes(tagName);
            const selectedCount = prevState[category].length;

            if (isSelected) {
                return {
                    ...prevState,
                    [category]: prevState[category].filter((item) => item !== tagName),
                };
            }

            if (MAX_TAGS[category] !== null && selectedCount >= MAX_TAGS[category]!) {
                alert(`최대 ${MAX_TAGS[category]}개의 태그만 선택할 수 있습니다.`);
                return prevState;
            }

            return {
                ...prevState,
                [category]: [...prevState[category], tagName],
            };
        });
    };

    const handleSubmit = async () => {
        if (!user) {
            console.log('사용자가 로그인되어 있지 않습니다.');
            return;
        }

        let uploadedImageUrls: string[] = [];

        try {
            // 이미지 업로드 시도
            if (images.length > 0) {
                uploadedImageUrls = (await handleImageUpload(images)) || [];
                if (uploadedImageUrls.length === 0) {
                    alert('이미지 업로드에 실패했습니다.');
                    return;
                }
            }


            // 업로드된 이미지 URL을 newPost 객체에 추가
            const newPost: PostInterface = {
                id: '',
                title: title,
                content: contents,
                author: {
                    id: user.uid,
                    name: user.displayName || 'Unknown User',
                    avatar: user.photoURL || "/place-holder.svg",
                },
                openKakaoTalkLink: "https://open.kakao.com/example",
                createdAt: new Date(),
                limitApplicant: 10,
                endDate: new Date(),
                closed: false,
                type: 'ACTIVE',
                viewCount: 0,
                modifiedAt: new Date(),
                isTemporary: false,
                limitUserCount: 5,
                thumbnail: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : undefined,
                appliedUserIds: [],
                matchedUserIds: [],
                location: '서울시 용산구',
                hashTags: selectedTags.conceptList,
                meetingDate: new Date(),
                place: selectedTags.placeList,
                day: selectedTags.dayList,
                images: uploadedImageUrls,
            };

            const docRef = await postsApi.createPost(newPost);
            alert('포스트가 성공적으로 저장되었습니다.');
            router.replace('/');
        } catch (error) {
            console.error('Error writing document: ', error);
            alert('포스트 저장 중 오류가 발생했습니다.');

            // 오류 발생 시 업로드된 이미지 삭제
            if (uploadedImageUrls.length > 0) {
                try {
                    await Promise.all(uploadedImageUrls.map(deleteImage));
                    console.log('업로드된 이미지를 삭제했습니다.');
                } catch (deleteError) {
                    console.error('업로드된 이미지 삭제 중 오류 발생:', deleteError);
                }
            }
        }
    };

    const renderTags = (category: TagCategory, list: string[]): JSX.Element[] => {
        return list.map((item) => (
            <TagItem
                key={item}
                text={item}
                isSelected={selectedTags[category].includes(item)}
                disable={false}
                onClick={() => toggleTag(category, item)}
            />
        ));
    };

    return (
        <>
            <div className="font-[Pretendard]">
                <div className="flex-grow p-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section1Title}
                    </p>
                    <input
                        type="text"
                        placeholder={t.write.section1Placeholder}
                        className="w-full p-2 pr-10 border border-gray-300 rounded mt-4 mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section2Title}
                    </p>
                    <p className="font-medium text-sm leading-5 text-left mt-3 mb-2">
                        {t.write.section2Placeholder}
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mb-8">
                        {renderTags('dayList', dayList)}
                    </div>

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section3Title}
                    </p>
                    <p className="font-medium text-sm leading-5 text-left mt-3 mb-2">
                        {t.write.section3Placeholder}
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mb-8">
                        {renderTags('placeList', placeList)}
                    </div>

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section4Title}
                    </p>
                    <p className="font-medium text-sm leading-5 text-left mt-3 mb-2">
                        {t.write.section4Placeholder}
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mb-8">
                        {renderTags('conceptList', conceptList)}
                    </div>

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section5Title}
                    </p>
                    <p className="font-medium text-sm leading-5 text-left mt-3 mb-6">
                        {t.write.section5Placeholder}
                    </p>

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section6Title}
                    </p>
                    <textarea
                        placeholder={t.write.section6Placeholder}
                        className="w-full h-48 p-3 border border-gray-300 rounded mb-8 mt-4 resize-none"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                    />

                    <p className="text-lg font-medium mb-2 w-full">
                        {t.write.section7Title}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.length < max_images && (
                            <div className="w-[120px] h-[120px] bg-gray-200">
                                <button
                                    className="w-full h-full bg-gray-200"
                                    onClick={() => handleOpenModal()}
                                >
                                    업로드 {images.length}/{max_images}
                                </button>
                            </div>
                        )}
                        {images.map((file, index) => {
                            const imageUrl = URL.createObjectURL(file);
                            return (
                                <div key={index} className="relative w-[120px] h-[120px] bg-gray-200 overflow-hidden">
                                    <Image
                                        src={imageUrl || "/place_profile.svg"}
                                        alt="image"
                                        layout="fill"
                                        objectFit="cover"
                                        sizes="(max-width: 120px) 100vw, 33vw"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <footer
                        className="fixed bottom-0 left-0 right-0 bg-gray-400 border-t border-gray-200 z-[9999] h-[88px] flex justify-center items-center"
                        onClick={handleSubmit}
                    >
                        <button className="w-full h-full max-w-[800px] flex justify-center items-center text-white font-bold text-xl">
                            {t.write.submit}
                        </button>
                    </footer>

                </div>
            </div>

            <RegionDialog
                open={openRegion}
                onConfrim={() => {
                    setOpenRegion(false);
                }}
                onClose={() => {
                    setOpenRegion(false);
                }}
            />
            <ImageUploaderWithCrop
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={localHandleImageUpload}
                initialImages={[]}
                multiple
            />
        </>
    );

}

export default withAuth(WritePage);

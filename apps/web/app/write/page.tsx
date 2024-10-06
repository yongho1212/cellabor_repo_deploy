'use client'

import { Metadata } from 'next'
import { PostInterface } from '@repo/types';
import { useAuth } from '../providers/AuthProvider';
import React from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import TagItem from '@repo/ui/components/Tag/TagItem';
import withAuth from 'app/components/withAuth';
import { doc, getDoc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

interface WriteProps {
    environment: 'desktop' | 'mobile' | 'react-native';
}

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
    // const isMobile = environment === 'mobile' || environment === 'react-native';
    const router = useRouter();

    const { user, loading } = useAuth();
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



    const fetchListsFromFirestore = async () => {
        try {
            const dayListSnapshot = await getDocs(collection(db, 'dayList'));
            const placeListSnapshot = await getDocs(collection(db, 'placeList'));
            const conceptListSnapshot = await getDocs(collection(db, 'conceptList'));

            const dayListData = dayListSnapshot.docs.flatMap(doc => doc.data().list);
            const placeListData = placeListSnapshot.docs.flatMap(doc => doc.data().list);
            const conceptListData = conceptListSnapshot.docs.flatMap(doc => doc.data().list);

            setDayList(dayListData);
            setPlaceList(placeListData);
            setConceptList(conceptListData);
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

    // 서버 전송 고도화 필요
    // 이미지, 지역 추가 해야함
    const handleSubmit = async () => {
        if (!user) {
            console.log('사용자가 로그인되어 있지 않습니다.');
            return;
        }

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
            appliedUserIds: [],
            matchedUserIds: [],
            location: '서울시 용산구',
            hashTags: selectedTags.conceptList,
            meetingDate: new Date(),
            place: selectedTags.placeList,
            day: selectedTags.dayList,
        };

        try {
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            console.log('Post ID: ', docRef.id);
            alert('포스트가 성공적으로 저장되었습니다.');
            router.replace('/');
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    };




    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        title: {
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            width: '100%',
        },
        tagsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'stretch',
            gap: '11px 10px',
            marginBottom: 30,
        },
        tag: {
            backgroundColor: '#FEE2E2',
            color: '#B91C1C',
            borderRadius: 9999,
            paddingHorizontal: 8,
            paddingVertical: 4,
            fontSize: 12,
            marginRight: 4,
            marginBottom: 4,
        },
        textarea: {
            width: '100%',
            height: 200,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            overflow: 'scroll',
            marginBottom: 30,
            marginTop: 16,
        },
        imageContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'stretch',
            gap: '11px 10px',
            marginBottom: 30,
        },
        image: {
            width: 96,
            height: 96,
            borderRadius: 4,
        },
        submitBtn: {
            fontSize: 20,
            fontWeight: 700,
        },
        footer: {
            backgroundColor: 'var(--Gray_600, #94999E)',
        },
    });

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
        <div style={{ fontFamily: 'Pretendard' }}>
            <div className="flex-grow p-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
                <Text style={styles.title} numberOfLines={1}>제목</Text>
                <input
                    type="text"
                    placeholder="제목을 입력해 주세요."
                    className="w-full p-2 pr-10 border border-gray-300 rounded mt-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="bg-gray-100 px-4 py-[8.5px] w-full h-auto mt-4 mb-8">
                    <p className="font-medium text-[14px] leading-[20px] text-left text-gray-400" >
                        광고, 불건전한 만남 목적, 종교 단체 관련 글 작성시 제재를 받으실 수 있습니다.
                    </p>
                </div>

                <Text style={styles.title} numberOfLines={1}>요일</Text>
                <p className="font-medium text-[14px] leading-[20px] text-left mt-3 mb-2">
                    촬영을 진행할 요일을 설정해 주세요.
                </p>
                <div style={styles.tagsContainer}>
                    {renderTags('dayList', dayList)}
                </div>

                <Text style={styles.title} numberOfLines={1}>장소</Text>
                <p className="font-medium text-[14px] leading-[20px] text-left mt-3 mb-2">
                    촬영을 진행할 장소를 설정해 주세요.
                </p>
                <div style={styles.tagsContainer}>
                    {renderTags('placeList', placeList)}
                </div>

                <Text style={styles.title} numberOfLines={1}>컨셉(최대 3개)</Text>
                <p className="font-medium text-[14px] leading-[20px] text-left mt-3 mb-2">
                    촬영을 진행할 컨셉을 설정해 주세요.
                </p>
                <div style={styles.tagsContainer}>
                    {renderTags('conceptList', conceptList)}
                </div>

                <Text style={styles.title} numberOfLines={1}>위치(추후 제공 예정)</Text>
                <p className="font-medium text-[14px] leading-[20px] text-left mt-3 mb-6">
                    추후 제공 예정입니다.
                </p>

                <Text style={styles.title} numberOfLines={1}>내용</Text>
                <textarea
                    placeholder="간단한 소개와 함께 작성하시면 촬영메이트 신청률이 높아져요. :)"
                    style={styles.textarea}
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                />

                <Text style={styles.title} numberOfLines={1}>참고 이미지</Text>
            </div>


            <footer
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] h-[88px] flex justify-center items-center"
                style={styles.footer}
                onClick={handleSubmit}
            >
                <button className="w-full h-full max-w-[800px] flex justify-center items-center text-white" style={styles.submitBtn}>
                    작성완료
                </button>
            </footer>




        </div>
    );
}

export default withAuth(WritePage);

import { PostInterface } from '@repo/types';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';


function convertFirestoreTimestampToDate(firestoreTimestamp: any): Date {
    return new Date(firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1000000);
}

export async function fetchPosts(queryTerm: string = '', filters: string[] = []): Promise<PostInterface[]> {
    const postsCollection = collection(db, 'posts');
    let q = query(postsCollection);

    // queryTerm이 있을 경우에만 검색
    if (queryTerm) {
        q = query(postsCollection, where('title', '>=', queryTerm), where('title', '<=', queryTerm + '\uf8ff'));
    }

    // filters가 있을 경우에만 필터 적용
    if (filters.length > 0) {
        filters.forEach((filter) => {
            switch (filter) {
                case '장소':
                    q = query(q, where('location', '!=', ''));
                    break;
                case '요일':
                    q = query(q, where('days', 'array-contains-any', ['월', '화', '수', '목', '금', '토', '일']));
                    break;
                case '시간대':
                    q = query(q, where('meetingDate', '!=', null));
                    break;
                case '컨셉':
                    q = query(q, where('place', 'array-contains-any', ['']));
                    break;
                default:
                    break;
            }
        });
    }

    const querySnapshot = await getDocs(q);
    const posts: PostInterface[] = [];

    querySnapshot.forEach((doc) => {
        const postData = doc.data();

        const post: PostInterface = {
            id: doc.id,
            title: postData.title || '',
            content: postData.content || '',
            author: postData.author || { id: '', name: '', avatar: '' },
            createdAt: postData.createdAt ? convertFirestoreTimestampToDate(postData.createdAt) : new Date(),
            modifiedAt: postData.modifiedAt ? convertFirestoreTimestampToDate(postData.modifiedAt) : new Date(),
            meetingDate: postData.meetingDate
                ? convertFirestoreTimestampToDate(postData.meetingDate).toISOString()
                : '',
            endDate: postData.endDate ? convertFirestoreTimestampToDate(postData.endDate).toISOString() : '',
            limitApplicant: postData.limitApplicant || 0,
            closed: postData.closed || false,
            type: postData.type || 'ACTIVE',
            viewCount: postData.viewCount || 0,
            isTemporary: postData.isTemporary || false,
            location: postData.location || '',
            hashTags: postData.hashTags || [],
            place: postData.place || [],
            openKakaoTalkLink: postData.openKakaoTalkLink || '',
            limitUserCount: postData.limitUserCount || 0,
            appliedUserIds: postData.appliedUserIds || [],
            matchedUserIds: postData.matchedUserIds || [],
            thumbnail: postData.thumbnail,
            day: postData.day,
            images: postData.images
        };

        posts.push(post);
    });

    return posts;
}



export async function fetchPostById(postId: string): Promise<PostInterface | null> {
    try {
        const postDocRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postDocRef);

        if (postSnapshot.exists()) {
            const postData = postSnapshot.data();

            const post: PostInterface = {
                id: postId,
                title: postData.title || '',
                content: postData.content || '',
                author: postData.author || { id: '', name: '', avatar: '' },
                createdAt: convertFirestoreTimestampToDate(postData.createdAt),
                modifiedAt: convertFirestoreTimestampToDate(postData.modifiedAt),
                meetingDate: convertFirestoreTimestampToDate(postData.meetingDate),
                endDate: convertFirestoreTimestampToDate(postData.endDate),
                limitApplicant: postData.limitApplicant || 0,
                closed: postData.closed || false,
                type: postData.type || 'ACTIVE',
                viewCount: postData.viewCount || 0,
                isTemporary: postData.isTemporary || false,
                location: postData.location || '',
                hashTags: postData.hashTags || [],
                place: postData.place || [],
                openKakaoTalkLink: postData.openKakaoTalkLink || '',
                limitUserCount: postData.limitUserCount || 0,
                appliedUserIds: postData.appliedUserIds || [],
                matchedUserIds: postData.matchedUserIds || [],
                thumbnail: postData.thumbnail,
                day: postData.day,
                images: postData.images
            };

            return post;
        } else {
            console.log('해당 ID의 게시물을 찾을 수 없습니다.');
            return null;
        }
    } catch (error) {
        console.error('오류 발생:', error);
        return null;
    }
}

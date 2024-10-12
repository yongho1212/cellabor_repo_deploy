export interface PostInterface {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    openKakaoTalkLink: string;
    createdAt: Date | string;
    limitApplicant: number;
    endDate: Date | string;
    closed: boolean;
    type: 'ACTIVE' | 'SHOPPING_MALL';
    viewCount: number;
    modifiedAt: Date | string;
    isTemporary: boolean;
    thumbnail?: string;
    limitUserCount: number;
    appliedUserIds: string[];
    matchedUserIds: string[];
    location: string;
    hashTags: string[];
    meetingDate: Date | string;
    place: string[];
    day?: string[];
    images?: string[];
}

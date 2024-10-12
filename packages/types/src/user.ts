export interface UserFBAuthInfoInterface {
    uid: string;
    displayName: string;
    email: string;
    profileImage?: string;
}

export interface InstagramUserInfo {
    website?: string;
    followers_count: number;
    profile_picture_url: string;
    follows_count: number;
    id: string;
    username: string;
}

export interface InstagramInfo {
    userInfo: InstagramUserInfo;
    instagramUserId: string;
    updatedAt: {
        _seconds: number;
        _nanoseconds: number;
    };
}

export interface UserInfoInterface extends UserFBAuthInfoInterface {
    gender?: 'male' | 'female' | 'other';
    birth?: Date;
    description?: string;
    phonenumber?: string;
    phoneverify?: boolean;
    hashtags?: string[];
    subimages?: string[];
    bookmarkPosts?: string[];
    modifiedAt?: Date;
    viewCount?: number;
    snsList?: { platform: string; username: string; url: string }[];
    createdAt: {
        _seconds: number;
        _nanoseconds: number;
    };
    instagram?: InstagramInfo;
}

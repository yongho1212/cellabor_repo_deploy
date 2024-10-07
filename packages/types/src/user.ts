export interface UserFBAuthInfoInterface {
    uid: string;
    displayName: string;
    email: string;
    profileImage?: string;
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
    createdAt?: Date;
}

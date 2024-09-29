export interface UserFBAuthInfoInterface {
    displayName: string;
    email: string;
    uid: string;
    photoURL?: string;
}

export interface UserInfoInterface extends UserFBAuthInfoInterface {
    gender?: 'male' | 'female' | 'other';
    birth?: Date;
    description?: string;
    phonenumber?: string;
    phoneverify?: boolean;
    hashtags?: string[];
    createdAt?: Date;
    subimages?: string[];
    bookmarkPosts?: string[];
    modifiedAt?: Date;
    viewCount?: number;
    snsList?: { platform: string; username: string; url: string }[];
}

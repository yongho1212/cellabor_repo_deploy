'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import {auth} from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import {profileApi} from '../apis/profile';

export default function MyProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profileData, setProfileData] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase 로그아웃 호출
            router.push('/'); // 로그아웃 후 로그인 페이지로 리다이렉트
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
                    const data = await profileApi.fetchProfileData(user.uid);
                    setProfileData(data);
                } catch (error) {
                    console.error('Failed to fetch profile data:', error);
                }
            }
        };

        fetchProfileData();
    }, [user]);

    if (loading || !profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Profile</h1>
            {/* 프로필 데이터 출력 */}
            <p>Your UID: {user?.uid}</p>
            <p>Profile Data: {JSON.stringify(profileData)}</p>
            <button onClick={handleLogout}>Log Out</button>

        </div>
    );
}

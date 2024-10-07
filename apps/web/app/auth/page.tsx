'use client';

import React, { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    UserCredential,
    signInWithCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Typography from '@repo/ui/components/Typography/Typography';
import Spacer from '@repo/ui/components/Spacer/Spacer';
import { validateAuthForm } from '@repo/utils';
import { UserFBAuthInfoInterface } from '@repo/types';
import Google from '../../public/logos/google_logo.png';
import Facebook from '../../public/logos/facebook_logo.png';
import withAuth from 'app/components/withAuth';
import FacebookLogin from '@greatsumini/react-facebook-login';

const Auth = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const msg = validateAuthForm(email, password, isLogin, confirmPassword);
        setError(msg || '');
    }, [email, password, isLogin, confirmPassword]);

    const checkAndCreateUser = async (user: any) => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date()
            });
            console.log('새 사용자 문서 생성됨');
        } else {
            console.log('기존 사용자 문서 존재');
        }
    };

    const processAuthResult = async (result: UserCredential) => {
        const user = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
        };

        await checkAndCreateUser(user);
        router.push('/');
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (error) return;

        try {
            let result: UserCredential;
            if (isLogin) {
                result = await signInWithEmailAndPassword(auth, email, password);
            } else {
                result = await createUserWithEmailAndPassword(auth, email, password);
            }
            await processAuthResult(result);
        } catch (error: any) {
            console.error(isLogin ? '로그인 실패:' : '회원가입 실패:', error);
            setError(isLogin ? '이메일 또는 비밀번호를 확인해주세요.' : '회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            await processAuthResult(result);
        } catch (error: any) {
            setError('소셜 로그인에 실패했습니다.');
        }
    };

    const handleFacebookLogin = async (response: any) => {
        try {
            const credential = FacebookAuthProvider.credential(response.accessToken);
            const result = await signInWithCredential(auth, credential);
            await processAuthResult(result);
        } catch (error: any) {
            console.error('Facebook 로그인 실패:', error);
            setError('Facebook 로그인에 실패했습니다.');
        }
    };

    const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
    // const handleFacebookLogin = () => handleSocialLogin(new FacebookAuthProvider());

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full">
            <div className="w-full bg-white ">
                <div className={'relative'}>
                    <Link href={'/'} className="absolute left-0 text-2xl">&lt;</Link>
                    <h2 className="text-2xl font-bold text-center mb-6 transition-all duration-300">
                        {isLogin ? '로그인' : '회원가입'}
                    </h2>
                </div>
                <form onSubmit={handleAuth} className="">
                    <Typography variant={'caption'}>이메일</Typography>
                    <input
                        type="email"
                        placeholder="이메일"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 p-2 border border-grey_300 rounded bg-white my-[15px]"
                    />
                    <Spacer height={20}/>
                    <Typography variant={'caption'}>비밀번호</Typography>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 p-2 border border-grey_300 rounded bg-white my-[15px]"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-14 p-2 border border-grey_300 rounded bg-white"
                        />
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {isLogin && (
                        <div className="flex items-center transition-all duration-300">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2 text-grey_300 accent-primary checked"
                            />
                            <label htmlFor="rememberMe">자동 로그인</label>
                            <span className="ml-auto">이메일 찾기 | 비밀번호 찾기</span>
                        </div>
                    )}
                    <Spacer height={55}/>
                    <button type="submit" className="w-full bg-black text-white p-2 rounded">
                        {isLogin ? '로그인' : '회원가입'}
                    </button>
                </form>
                <button
                    onClick={toggleAuthMode}
                    className="w-full bg-white text-black border border-black p-2 rounded mt-4"
                >
                    {isLogin ? '회원가입' : '로그인으로 돌아가기'}
                </button>
                <Spacer height={55}/>
                <div className="text-center">
                    <p className="mb-4">SNS로 로그인하기</p>
                    <div className="flex justify-center space-x-4 py-4">
                        <button onClick={handleGoogleLogin} className="w-10 h-10 rounded-full justify-center flex items-center">
                            <Image src={Google} alt="Google" />
                        </button>
                        <FacebookLogin
                            appId={process.env.NEXT_PUBLIC_FB_AUTH_FACEBOOK_APP_ID!}
                            onSuccess={handleFacebookLogin}
                            // fields='name, email, picture'
                            onFail={(error) => {
                                console.log('Facebook Login Failed!', error);
                                setError('Facebook 로그인에 실패했습니다.');
                            }}
                            render={({onClick}) => (
                                <button onClick={onClick} className="w-10 h-10 bg-blue-500 rounded-full justify-center flex items-center">
                                    <Image src={Facebook} alt="Facebook" />
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Auth);

'use client'

import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { authApi } from '../apis/auth';
import Google from '../../public/google_logo.png'
import Facebook from '../../public/facebook_logo.png'
import Image from 'next/image';
import Link from 'next/link';
import {router} from 'next/client';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')

    const validateForm = () => {
        if (!email || !password) {
            setError('모든 필드를 입력해주세요.')
            return false
        }
        if (!isLogin && password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            return false
        }
        if (!isLogin && password.length < 10) {
            setError('비밀번호는 10자리 이상이어야 합니다.')
            return false
        }
        if (!isLogin && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError('비밀번호에는 특수문자가 포함되어야 합니다.')
            return false
        }
        return true
    }

    const handleUserData = async (user: any) => {
        const { email, displayName, uid, photoURL } = user;
        try {
            // 사용자 데이터를 DB에 저장 또는 업데이트
            const res = await authApi.register({ email, displayName, uid, photoURL });

            console.log('사용자 데이터 저장/업데이트 성공');
            // 여기에 로그인 성공 후 처리 (예: 리다이렉트) 추가
        } catch (error) {
            console.error('사용자 데이터 저장/업데이트 실패:', error);
            setError('사용자 데이터 처리 중 오류가 발생했습니다.');
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) return

        try {
            let user;
            if (isLogin) {
                const result = await signInWithEmailAndPassword(auth, email, password);
                console.log(result)
                user = result.user;
            } else {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                user = result.user;
            }
            await handleUserData(user);
        } catch (error) {
            console.error(isLogin ? '로그인 실패:' : '회원가입 실패:', error);
            setError(isLogin ? '이메일 또는 비밀번호를 확인해주세요.' : '회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }

    const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result,'snsres')
            await handleUserData(result.user);
        } catch (error) {
            console.error('소셜 로그인 실패:', error);
            setError('소셜 로그인에 실패했습니다.');
        }
    }
    const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
    const handleFacebookLogin = () => handleSocialLogin(new FacebookAuthProvider());


    return (
        <div className="flex flex-col items-center min-h-screen bg-pink-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className={'relative'}>
                    <Link href={'/'} className="absolute left-0 text-2xl">&lt;</Link>
                    <h2 className="text-2xl font-bold text-center mb-6 transition-all duration-300">
                        {isLogin ? '로그인' : '회원가입'}
                    </h2>
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                    <input
                        type="email"
                        placeholder="이메일"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 bg-white"
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
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe">자동 로그인</label>
                            <span className="ml-auto">이메일 찾기 | 비밀번호 찾기</span>
                        </div>
                    )}
                    <button type="submit" className="w-full bg-black text-white p-2 rounded">
                        {isLogin ? '로그인' : '회원가입'}
                    </button>
                </form>
                <button
                    onClick={() => {
                        setIsLogin(!isLogin)
                        setError('')
                    }}
                    className="w-full bg-white text-black border border-black p-2 rounded mt-4"
                >
                    {isLogin ? '회원가입' : '로그인으로 돌아가기'}
                </button>
                <div className="mt-6 text-center">
                    <p className="mb-4">SNS로 로그인하기</p>
                    <div className="flex justify-center space-x-4">
                        <button onClick={handleGoogleLogin} className="w-10 h-10 rounded-full justify-center flex items-center">
                            <Image src={Google} alt="Google" />
                        </button>
                        <button onClick={handleFacebookLogin} className="w-10 h-10 bg-blue-500 rounded-full justify-center flex items-center">
                            <Image src={Facebook} alt="Facebook" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

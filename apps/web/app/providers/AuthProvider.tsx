'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import {onAuthStateChanged, signOut, User} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, handleLogout: async () => {} });

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [unAuthorized, setUnAuthorized] = useState(false);
    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    useEffect(() => {
        if (loading && !user){
            setUnAuthorized(true)
        }
    }, [user, loading]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUnAuthorized(false);
            } else {
                setUnAuthorized(true);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (unAuthorized && !loading) {
            router.push('/auth');
        }
    }, [unAuthorized, loading, router]);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogout }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

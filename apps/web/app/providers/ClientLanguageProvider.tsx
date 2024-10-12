'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Locale, getDictionary } from '@repo/i18n';


interface LanguageContextType {
    lang: Locale;
    t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

interface ClientLanguageProviderProps {
    children: ReactNode;
    lang: Locale;
    t: any;
}

export default function ClientLanguageProvider({ children, lang, t }: ClientLanguageProviderProps) {
    return (
        <LanguageContext.Provider value={{ lang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

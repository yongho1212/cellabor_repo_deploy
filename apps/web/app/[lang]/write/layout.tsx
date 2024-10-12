import React, {ReactNode} from 'react';
import ClientLanguageProvider from '../../providers/ClientLanguageProvider';
import {getDictionary, Locale} from '@repo/i18n';


interface LayoutProps {
    children: ReactNode;
    params: { lang: Locale };
}


export default async function WriteLayout({children, params: {lang}}: LayoutProps) {
    const dictionary = await getDictionary(lang);

    return (
        <ClientLanguageProvider lang={lang} t={dictionary}>
            {children}
        </ClientLanguageProvider>

    );
}

import type { Metadata } from 'next'
import {ReactNode, Suspense} from 'react'
import { Locale, getDictionary } from '@repo/i18n'
import ClientLanguageProvider from '../../../providers/ClientLanguageProvider';

interface LayoutProps {
    children: ReactNode;
    params: { lang: Locale };
}

// export const metadata: Metadata = {
//     title: 'Cellabor',
//     description: '원하는 스타일의 촬영메이트를 쉽게 찾아보세요',
// }

export default async function ProfileLayout({ children, params: { lang } }: LayoutProps) {
    const dictionary = await getDictionary(lang);

    return (
        <ClientLanguageProvider lang={lang} t={dictionary}>
            {children}
        </ClientLanguageProvider>
    )
}


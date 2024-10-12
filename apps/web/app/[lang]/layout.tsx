import '../globals.css'
import type {Metadata} from 'next'
import {ReactNode, Suspense} from 'react'
import dynamic from 'next/dynamic';

import {Locale, getDictionary} from '@repo/i18n';
const Navigator = dynamic(() => import('../components/Navigator'), { ssr: false })
const ClientLanguageProvider = dynamic(() => import('../providers/ClientLanguageProvider'), { ssr: false })



interface RootLayoutProps {
    children: ReactNode;
    params: { lang: Locale };
}

export const metadata: Metadata = {
    title: 'Cellabor',
    description: '원하는 스타일의 촬영메이트를 쉽게 찾아보세요',
}

// fetchPosts

export default async function RootLayout({children, params: {lang}}: RootLayoutProps) {
    const dictionary = await getDictionary(lang);

    return (
        <html lang={lang}>
            <body className={`bg-background text-text mobile-layout-container`}>
                <ClientLanguageProvider lang={lang} t={dictionary}>
                    <Navigator/>
                </ClientLanguageProvider>
                <main className='py-16'>
                    {children}
                </main>
            </body>
        </html>
    )
}

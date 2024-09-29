import './globals.css'
import type {Metadata} from 'next'
import { Suspense } from 'react'
import Loading from './components/Loading'
import {ClientAuthProvider} from './providers/AuthProvider'
import NavBar from './components/NavBar';
import HeaderBar from './components/HeaderBar';



export const metadata: Metadata = {
    title: '활동메이트 찾기 앱',
    description: '다양한 활동을 함께할 메이트를 찾아보세요!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
        <body className={`bg-background text-text mobile-layout-container`}>
            <HeaderBar/>
            <div className={'h-12'}/>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <div className={'h-12'}/>
            <NavBar/>
        </body>
        </html>
    )
}

import './globals.css'
import type {Metadata} from 'next'
import { Suspense } from 'react'
import Loading from './components/Loading'
import NavBar from './components/NavBar';
import HeaderBar from './components/HeaderBar';


export const metadata: Metadata = {
    title: 'Cellabor',
    description: '원하는 스타일의 촬영메이트를 쉽게 찾아보세요',
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

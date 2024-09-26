import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClientAuthProvider} from './providers/AuthProvider'
import './globals.css'
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] })

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
        <body className={`${inter.className} bg-background text-text mobile-layout-container`}>
            <ClientAuthProvider>
              {children}
                <NavBar />

            </ClientAuthProvider>
        </body>
      </html>
  )
}

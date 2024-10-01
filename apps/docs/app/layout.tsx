import type { Metadata } from 'next';
// import localFont from "next/font/local";
import Script from 'next/script';

import './globals.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
    title: 'Cell2abor',
    description: '원하는 스타일의 촬영메이트를 쉽게 찾아보세요',
    keywords: ['촬영', '메이트', '스타일', '사진', '영상'],
    // icons: {
    //     icon: '/favicon.ico', // favicon 파일 경로
    // },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                {/* Google Analytics gtag.js */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-38H3CDXCLJ"
                ></Script>
                <Script id="google-analytics">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-38H3CDXCLJ');
          `}
                </Script>
            </head>
            <body
            // className={`${geistSans.variable} ${geistMono.variable}`}
            >
                {children}
            </body>
        </html>
    );
}

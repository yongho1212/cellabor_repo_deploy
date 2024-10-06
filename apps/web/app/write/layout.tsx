import React from 'react';
import Link from 'next/link'

export default function WriteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-4xl mx-auto">
            <header className="bg-white flex items-center justify-center relative h-16">
                <Link href="/" className="absolute left-4 text-2xl">←</Link>
                <h1 className="text-center text-xl font-medium">글쓰기</h1>
            </header>
            {children}

        </div>
    );
}

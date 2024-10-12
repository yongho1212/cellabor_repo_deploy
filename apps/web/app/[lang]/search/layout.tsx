import React, { ReactNode } from 'react';
const SearchForm = dynamic(() => import('../../components/SearchForm'), { ssr: false })
import { getDictionary, Locale } from '@repo/i18n';
import dynamic from 'next/dynamic';

interface LayoutProps {
    children: ReactNode;
    params: { lang: Locale };
}

export default async function SearchLayout({ children, params: { lang } }: LayoutProps) {
    const dictionary = await getDictionary(lang);
    return (
        <div className="">
            <h1 className="text-lg sm:text-2xl font-bold my-4 text-center">{dictionary.search.title}</h1>
            <SearchForm />
            {children}
        </div>
    );
}

import React from 'react';
import SearchForm from '../components/SearchForm';

export default function SearchLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-lg sm:text-2xl font-bold my-4 text-center">나와 마음맞는 촬영메이트를 찾아보세요</h1>
            <SearchForm />
            {children}
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineSearch } from "react-icons/md";
import { useResponsive } from '../hooks/useResponsive';


export default function SearchForm() {
    const { isMobile } = useResponsive();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({ q: searchTerm });
        // activeFilters.forEach(filter => queryParams.append('filter', filter));
        router.push(`${window.location.pathname}?${queryParams.toString()}`);
    };

    // const toggleFilter = (filter: string) => {
    //     setActiveFilters(prev =>
    //         prev.includes(filter)
    //             ? prev.filter(f => f !== filter)
    //             : [...prev, filter]
    //     );
    // };

    return (
        <div>
            <form onSubmit={handleSearch} className="mb-4 relative">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full p-2 pr-10 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    aria-label="Search"
                >
                    <MdOutlineSearch size={24} />
                </button>
            </form>
            {/* <div className="flex flex-wrap gap-2 mb-4">
                {['지역', '요일', '시간대', '장소', '컨셉'].map((filter) => (
                    <button
                        key={filter}
                        className={`px-3 py-1 rounded-full text-sm border-b-2 flex flex-row gap-2 items-center text-sm ${activeFilters.includes(filter) ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'
                            }`}
                        onClick={() => toggleFilter(filter)}
                    >
                        {filter} {activeFilters.includes(filter) ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                    </button>
                ))}
            </div> */}
        </div>
    );
}

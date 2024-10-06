'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../globals.css'
// import sharedConfig from "@repo/tailwind-config";
//
// console.log(sharedConfig)

const NAV_ITEMS = [
    { label: '홈', path: '/', icon: '🏠' },
    { label: '검색', path: '/search', icon: '🔍' },
    { label: '글쓰기', path: '/write', icon: '✏️' },
    { label: '마이페이지', path: '/profile', icon: '👤' },
]

export default function NavBar() {
    const pathname = usePathname()

    if (pathname === '/write') return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999]">
            <div className="max-w-[800px] px-[20px] mx-auto ">
                <ul className="flex justify-around">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.path}>
                            <Link href={item.path} className={`block py-3 px-2 text-center ${pathname === item.path ? 'text-primary' : 'text-gray-500'}`}>
                                <span className="block text-xl mb-1">{item.icon}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

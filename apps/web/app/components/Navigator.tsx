'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FaAngleLeft } from "react-icons/fa6";
import { useLanguage } from '../providers/ClientLanguageProvider';
import CellaborLogo from '../components/CellaborLogo'


const NAV_ITEMS = [
    { label: '홈', path: '/', icon: '🏠' },
    { label: '검색', path: '/search', icon: '🔍' },
    { label: '글쓰기', path: '/write', icon: '✏️' },
    { label: '마이페이지', path: '/profile', icon: '👤' },
]

export default function Navigator() {
    const pathname = usePathname();
    const router = useRouter()

    const { t, lang } = useLanguage();

    function filterPath(aaa: any) {
        return aaa !== lang && aaa !== "";
    }

    const pathSegments = pathname.split('/').filter(filterPath);
    const isHome = pathSegments.length === 0;
    const currentPage = pathSegments[0] || 'home';


    const getPageTitle = () => {
        if (pathSegments.length > 1) {
            return t.nav[currentPage] || 'Page';
        }
        return t.nav[currentPage] || currentPage;
    }


    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 bg-white h-16 w-full flex justify-center items-center z-[9999]">
                <nav className="w-full mx-auto h-full ">
                    <div className="flex justify-center  h-full max-w-[800px]" style={{ margin: '0 auto' }}>
                        {isHome ?
                            <Link href="/" className={'flex items-center'}>
                                {/*<Image*/}
                                {/*    src='logos/cellabor_typo.svg'*/}
                                {/*    width={100}*/}
                                {/*    height={40}*/}
                                {/*    alt="logo"*/}
                                {/*    priority*/}
                                {/*    loading="eager"*/}
                                {/*    style={{height: 'auto'}}*/}
                                {/*/>*/}
                                <CellaborLogo width={100} height={30} />

                            </Link>
                            :
                            <div className='w-full relative flex items-center justify-center '>
                                <button onClick={() => router.back()} className="text-gray-600 absolute left-4">
                                    <FaAngleLeft size={20} />
                                </button>
                                <span className="font-semibold">{getPageTitle()}</span>
                            </div>

                        }
                    </div>
                </nav>
            </header>
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999]">
                <div className="max-w-[800px] px-[20px] mx-auto ">
                    <ul className="flex justify-around">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.path}>
                                <Link href={item.path}
                                    className={`block py-3 px-2 text-center ${pathname === item.path ? 'text-primary' : 'text-gray-500'}`}>
                                    <span className="block text-xl mb-1">{item.icon}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
}

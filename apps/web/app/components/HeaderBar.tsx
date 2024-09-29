'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../globals.css'
import Image from 'next/image'

export default function HeaderBar() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white h-12 flex justify-center items-center z-[9999] " >
            <div className="w-full mx-auto ">
                <div className="flex justify-around">
                    <Link href="/">
                        <Image
                            src='logos/cellabor_typo.svg'
                            width={100}
                            height={40}
                            alt="logo"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

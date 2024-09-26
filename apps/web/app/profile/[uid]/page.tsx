'use client'

import { usePathname } from 'next/navigation'

export default function UserProfilePage() {
    const pathname = usePathname()
    console.log(pathname)

    return (
        <div>
            <h1>User Profile</h1>
            <p>User UID: {pathname}</p>
        </div>
    );
}

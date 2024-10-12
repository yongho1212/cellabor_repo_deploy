'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
    const [selectedLang, setSelectedLang] = useState<string>('en');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const cookieLang = document.cookie
            .split('; ')
            .find((row) => row.startsWith('i18nlang='))
            ?.split('=')[1];

        if (cookieLang) {
            setSelectedLang(cookieLang);
        }
    }, []);

    const handleLanguageChange = (lang: string) => {
        document.cookie = `i18nlang=${lang}; path=/;`;
        setSelectedLang(lang);

        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === 'en' || segments[0] === 'ko') {
            segments[0] = lang;
        } else {
            segments.unshift(lang);
        }
        const newPath = `/${segments.join('/')}`;

        window.location.href = newPath;
    };

    return (
        <div>
            <button
                className={`px-4 py-2 ${selectedLang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleLanguageChange('en')}
            >
                English
            </button>
            <button
                className={`px-4 py-2 ${selectedLang === 'ko' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleLanguageChange('ko')}
            >
                한국어
            </button>
        </div>
    );
};

export default LanguageSwitcher;

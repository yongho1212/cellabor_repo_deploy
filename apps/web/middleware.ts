import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as localeMatch } from '@formatjs/intl-localematcher';

const locales = ['en', 'ko'];
const defaultLocale = 'en';
const cookieName = 'i18nlang';

function getLocale(request: NextRequest): string {
    const cookieLang = request.cookies.get(cookieName)?.value;
    if (cookieLang) return cookieLang;

    const acceptLanguage = request.headers.get('Accept-Language');
    if (!acceptLanguage) return defaultLocale;

    const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } });
    const languages = negotiator.languages();
    return localeMatch(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.includes('.')) {
        return NextResponse.next();
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    const locale = getLocale(request) || defaultLocale;
    const response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));

    response.cookies.set(cookieName, locale);

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)'],
};

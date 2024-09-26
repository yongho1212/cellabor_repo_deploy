// import { NextResponse } from 'next/server';
//
// export function middleware(request) {
//   const url = request.nextUrl.clone();
//   const hostname = request.headers.get('host'); // 서브도메인 정보 가져오기
//
//   // 예: about.example.com -> about
//   const subdomain = hostname.split('.')[0];
//
//   // 특정 서브도메인에 따른 페이지 리다이렉션
//   if (subdomain === 'about') {
//     url.pathname = `/about${url.pathname}`;
//   } else {
//     url.pathname = `${url.pathname}`;
//   }
//
//   return NextResponse.rewrite(url);
// }
//
// export const config = {
//   matcher: ['/((?!api|_next|static).*)'], // 적용할 라우트 설정
// };

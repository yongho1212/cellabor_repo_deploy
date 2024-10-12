import {authApi} from '@repo/apis';

export const instagramAuthInitiate = async () => {
    const url = await authApi.instagramGetUrl();
    window.location.href = url;
}


// export const instagramAuthInitiate = (locale: string) => {
//     const baseRedirectUrl = process.env.NEXT_PUBLIC_BUSINESS_FACEBOOK_REDIRECT_URL!;
//     const localizedRedirectUrl = `${baseRedirectUrl}/${locale}/instagram/callback`;
//
//     console.log(localizedRedirectUrl, baseRedirectUrl)
//
//     const authUrl =
//         'https://www.facebook.com/v21.0/dialog/oauth?' +
//         `client_id=${process.env.NEXT_PUBLIC_BUSINESS_FACEBOOK_APP_ID}` +
//         `&redirect_uri=${encodeURIComponent(localizedRedirectUrl)}` +
//         `&state={st=state123abc,ds=123456789,locale=${locale}}` +
//         '&scope=pages_show_list,pages_read_engagement,instagram_basic';
//
//     window.location.href = authUrl;
// };

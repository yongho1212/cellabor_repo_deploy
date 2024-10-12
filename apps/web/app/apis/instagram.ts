import {authApi} from '@repo/apis';

export const instagramAuthInitiate = async () => {
    const url = await authApi.instagramGetUrl();
    window.location.href = url;
}

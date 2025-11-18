import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { authProvider } from '$lib/utils';

export const load = (async () => {
    try {
        const token = await authProvider.getToken();
        // console.log(token);
        return {}
    } catch (error) {
        // console.log(error);
        const authUrl = authProvider.generateAuthUrl();
        // console.log(authUrl, authUrl.toString());
        redirect(302, authUrl.toString());
    }
}) satisfies PageServerLoad;
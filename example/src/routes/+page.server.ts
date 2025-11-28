import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { authProvider } from '$lib/utils';

export const load = (async () => {
    try {
        await authProvider.getToken();
        return {}
    } catch (error) {
        const authUrl = authProvider.generateAuthUrl();
        redirect(302, authUrl.toString());
    }
}) satisfies PageServerLoad;

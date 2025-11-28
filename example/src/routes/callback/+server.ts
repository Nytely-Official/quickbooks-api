import { authProvider } from '$lib/utils';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ url }) => {
    const { code, realmId } = Object.fromEntries(url.searchParams.entries()) as {
        code: string;
        realmId: string;
    };

    await authProvider.exchangeCode(code, realmId);

    redirect(302, "/");
};
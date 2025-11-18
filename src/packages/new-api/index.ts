import type { QBResponse } from "./types";
import type { AuthProvider } from "../auth/auth-provider";

function toQueryString(params: Record<string, string | number | boolean | null | undefined>) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) continue;
        queryParams.set(key, encodeURIComponent(value));
    }
    const searchString = queryParams.toString(); // already percent-encoded
    if (!searchString) return '';
    return `?${searchString}`;
}

async function baseUrl(authProvider: AuthProvider) {
    const token = await authProvider.getToken();
    if (authProvider.environment === "sandbox") {
        return `https://sandbox-quickbooks.api.intuit.com/v3/company/${token.realmId}`;
    }
    return `https://quickbooks.api.intuit.com/v3/company/${token.realmId}`;
}

export async function apiHeaders(
    authProvider: AuthProvider,
    options: {
        useAcceptHeader?: boolean,
    } = {}
) {
    const token = await authProvider.getToken();
    const headers: Record<string, string> = {
        'Authorization': `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
    }
    if (options.useAcceptHeader !== false) {
        headers['Accept'] = 'application/json';
    }
    return headers;
}

export async function buildUrl(authProvider: AuthProvider, { path, params = {} }: {
    path: any[],
    params?: Record<string, string>,
}) {
    const encodedPath = path.map(segment => encodeURIComponent(segment));
    const urlString = [
        await baseUrl(authProvider),
        ...encodedPath
    ].join("/");
    const searchString = toQueryString(params);
    return new URL(urlString + searchString);
}

export async function parseResponse<
    const TSuccess extends Record<string, any>,
    const TResponse extends QBResponse<TSuccess> = QBResponse<TSuccess>
>(responseData: TResponse) {
    if (responseData.Fault) {
        return {
            fault: {
                error: responseData.Fault.Error.map(error => ({
                    detail: error.Detail,
                    message: error.Message,
                    code: error.code
                })),
                type: responseData.Fault.type,
            },
        }
    }
    if (responseData.fault) {
        return {
            fault: responseData.fault,
        }
    }
    const { time, fault, Fault, ...success } = responseData;
    return {
        data: success as TSuccess
    };
}

type ApiOptions = {
    path: any[],
} & (
        {
            method: "GET",
            params?: Record<string, any>,
        }
        | {
            method: "POST",
            params?: Record<string, any>,
            body?: Record<string, any>,
        }
    )

export async function callApi<
    const TSuccess extends Record<string, any>
>(
    authProvider: AuthProvider,
    options: ApiOptions
) {
    try {
        const response = await fetch(
            await buildUrl(authProvider, {
                path: options.path,
                params: options.params,
            }),
            {
                method: options.method,
                headers: await apiHeaders(authProvider),
                body: options.method === "POST" ? JSON.stringify(options.body) : undefined,
            }
        );

        const responseData = await response.json();
        const parsedResponseData = await parseResponse<TSuccess>(responseData);

        return parsedResponseData;
    } catch (error) {
        return {
            fault: {
                error: [{
                    message: "Failed Request",
                    detail: (error as Error)?.message ?? "There was a API level error",
                    code: "500",
                }],
                type: "ServerError",
            },
        }
    }
}

import * as estimate from "./estimate";
import * as invoice from "./invoice";
import * as account from "./account";
import * as customer from "./customer";

export {
    estimate,
    invoice,
    account,
    customer,
}
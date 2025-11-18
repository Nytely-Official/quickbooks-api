import { apiHeaders, buildUrl, callApi, parseResponse } from ".";
import type { AuthProvider } from "../auth/auth-provider";
import type { DocumentType } from "./types/defs";
import type { Documents } from "./types/defs";
import { Prettify } from "./types/helpers";


export function defaultQuery<
    const TDocumentType extends DocumentType
>(
    documentType: TDocumentType
) {
    async function run(authProvider: AuthProvider, query: string) {
        const selectEstimateRegex = new RegExp(`^select\\s+(.*)+\\s+from\\s+${documentType}`, "i");
        if (!selectEstimateRegex.test(query.trim())) {
            return {
                fault: {
                    error: [{
                        code: "400",
                        message: "Invalid query",
                        detail: `This query must query ${documentType}s i.e. select * from ${documentType}`,
                    }],
                    type: "InvalidQuery",
                },
                data: undefined,
            };
        }
        const response = await callApi<{
            QueryResponse: Prettify<{
                [K in TDocumentType]: Documents[K][];
            } & {
                startPosition: number;
                maxResults: number;
            }>;
        }>(authProvider, {
            path: ["query"],
            method: "GET",
            params: {
                query,
            }
        });
        if (response.fault) {
            return {
                fault: response.fault,
                data: undefined,
            };
        }
        return {
            fault: undefined,
            data: response.data.QueryResponse
        };
    }

    return run;
}

export function defaultRead<
    const TDocumentType extends DocumentType
>(
    documentType: TDocumentType
) {
    async function run(authProvider: AuthProvider, id: string | number) {
        const response = await callApi<{ [documentType]: Documents[TDocumentType] }>(authProvider, {
            path: [documentType.toLowerCase(), id],
            method: "GET",
        });
        if (response.fault) {
            return {
                fault: response.fault,
                data: undefined,
            }
        }
        return {
            fault: undefined,
            data: response.data[documentType]
        }
    }

    return run
}

export function defaultRemove(
    documentType: DocumentType
) {
    async function run(authProvider: AuthProvider, body: {
        id: string;
        syncToken: string;
    }) {
        const response = await callApi<{
            [documentType]: {
                "status": string;
                "Id": string;
                "domain": string;
            }
        }>(authProvider, {
            path: [documentType.toLowerCase()],
            method: "POST",
            body,
            params: {
                operation: "delete",
            }
        });
        if (response.fault) {
            return {
                fault: response.fault,
                data: undefined,
            }
        }
        return {
            fault: undefined,
            data: response.data[documentType]
        }
    }

    return run
}

export function defaultCreate<
    TData extends Record<string, any>,
    const TDocumentType extends DocumentType
>(
    documentType: TDocumentType
) {
    async function run(
        authProvider: AuthProvider,
        data: TData
    ) {
        const response = await callApi<{ [documentType]: Documents[TDocumentType] }>(authProvider, {
            path: [documentType.toLowerCase()],
            method: "POST",
            body: data,
        });
        if (response.fault) {
            return {
                fault: response.fault,
                data: undefined,
            }
        }
        return {
            fault: undefined,
            data: response.data[documentType]
        }
    }

    return run
}

export function defaultUpdate<
    TData extends Record<string, any>,
    const TDocumentType extends DocumentType,
>(
    documentType: TDocumentType
) {
    async function run(
        authProvider: AuthProvider,
        data: Prettify<Omit<TData, "sparse"> & {
            sparse: boolean;
        }>
    ) {
        const response = await callApi<{ [documentType]: Documents[TDocumentType] }>(authProvider, {
            path: [documentType.toLowerCase()],
            method: "POST",
            body: data,
        });
        if (response.fault) {
            return {
                fault: response.fault,
                data: undefined,
            }
        }
        return {
            fault: undefined,
            data: response.data[documentType]
        }
    }

    return run
}

export function defaultPdf(
    documentType: "Estimate" | "Invoice"
) {
    async function run(authProvider: AuthProvider, id: string | number) {
        const response = await fetch(
            await buildUrl(authProvider, {
                path: [documentType.toLowerCase(), id, "pdf"],
            }),
            {
                method: "GET",
                headers: await apiHeaders(authProvider, { useAcceptHeader: false }),
            }
        );
        if (!response.ok) {
            const responseData = await response.json();
            const parsedResponseData = await parseResponse<any>(responseData);
            return {
                fault: parsedResponseData.fault,
                data: undefined,
            }
        }
        return {
            data: await response.arrayBuffer(),
            fault: undefined,
        }
    }

    return run
}
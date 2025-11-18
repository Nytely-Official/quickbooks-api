import { callApi } from ".";
import { defaultRead, defaultQuery, defaultRemove, defaultCreate, defaultUpdate, defaultPDF } from "./default-apis";
import type Estimate from "./types/estimate";
import type { AuthProvider } from "../auth/auth-provider";
import { PickRequired } from "./types/helpers";

export const read = defaultRead("Estimate");
export const query = defaultQuery("Estimate");
export const remove = defaultRemove("Estimate");
export const create = defaultCreate<PickRequired<Estimate, "CustomerRef" | "Line">, "Estimate">("Estimate");
export const update = defaultUpdate<PickRequired<Estimate, "CustomerRef" | "Id" | "SyncToken">, "Estimate">("Estimate");

export async function send(
    authProvider: AuthProvider,
    options: { id: string; sendTo?: string }
) {
    const response = await callApi<{ Estimate: Estimate }>(authProvider, {
        path: ["estimate", options.id, "send"],
        method: "POST",
        params: options.sendTo ? { sendTo: options.sendTo } : undefined,
    });
    if (response.fault) {
        return {
            fault: response.fault,
            data: undefined,
        }
    }
    return {
        fault: undefined,
        data: response.data.Estimate
    }
}

export const pdf = defaultPDF("Estimate");

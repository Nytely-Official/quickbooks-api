import type { Preferences } from "./types/preferences";
import type { PickRequired } from "./types/helpers";
import type { AuthProvider } from "../auth/auth-provider";
import { callApi } from ".";
import { defaultUpdate } from "./default-apis";

export async function read(authProvider: AuthProvider) {
    const response = await callApi<{ Preferences: Preferences }>(authProvider, {
        path: ["preferences"],
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
        data: response.data.Preferences
    }
}
export const update = defaultUpdate<PickRequired<Preferences, "Id" | "SyncToken">, "Preferences">("Preferences");

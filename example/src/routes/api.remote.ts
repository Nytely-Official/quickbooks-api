import { command, query } from "$app/server";
import * as v from "valibot"
import { authProvider } from "$lib/utils";
import { estimate } from "$newApi";

export const refreshToken = command(async () => {
    console.log(await authProvider.getToken())
    await authProvider.refresh();
    console.log(await authProvider.getToken())
    return true
});

export const getEstimate = query(v.union([v.string(), v.number()]), async (id) => {
    return await estimate.read(authProvider, id);
});

export const updateEstimateDate = command(v.object({
    Id: v.string(),
    TxnDate: v.string(),
    SyncToken: v.string(),
    CustomerRef: v.object({
        value: v.string(),
        name: v.optional(v.string()),
    }),
}), async (data) => {
    console.log(data);
    const response = await estimate.update(authProvider, {
        ...data,
        sparse: true,
    });
    console.log(response);
    return response;
});
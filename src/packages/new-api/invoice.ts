import { defaultRead, defaultQuery, defaultCreate, defaultUpdate, defaultRemove } from "./default-apis";
import type { Invoice } from "./types/invoice";
import { PickRequired } from "./types/helpers";
import { AuthProvider } from "../auth/auth-provider";
import { callApi } from ".";

export const query = defaultQuery("Invoice");
export const read = defaultRead("Invoice");
export const create = defaultCreate<PickRequired<Invoice, "CustomerRef" | "Line">, "Invoice">("Invoice");
export const update = defaultUpdate<PickRequired<Invoice, "Id" | "SyncToken" | "CustomerRef" | "Line">, "Invoice">("Invoice")

/**
 * Use this operation to delete the invoice object specified in the request
 * body. Include a minimum of `Invoice.Id` and `Invoice.SyncToken` in
 * the request body. You must unlink any linked transactions associated
 * with the invoice object before deleting it.
 */
export const remove = defaultRemove("Invoice");


/**
 * Use this operation to void an existing invoice object; include a
 * minimum of `Invoice.Id` and the current `Invoice.SyncToken`. The
 * transaction remains active but all amounts and quantities are zeroed
 * and the string, `Voided`, is injected into `Invoice.PrivateNote`,
 * prepended to existing text if present.
 * 
 * @param authProvider AuthProvider class instance
 * @param data Object containing the `Invoice.Id` and `Invoice.SyncToken`
 * @returns Object containing the `Invoice`
 */
export async function cancel(
    authProvider: AuthProvider,
    data: Pick<Invoice, "Id" | "SyncToken">
) {
    const response = await callApi<{ Invoice: Invoice }>(authProvider, {
        path: ["invoice"],
        method: "POST",
        params: {
            operation: "void"
        },
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
        data: response.data.Invoice
    }
}

/**
 * Use this operation to send an existing invoice object to the customer.
 * 
 * The `Invoice.EmailStatus` parameter is set to `EmailSent`.
 * The `Invoice.DeliveryInfo` element is populated with sending information.
 * The `Invoice.BillEmail.Address` parameter is updated to the address specified
 * with the value of the `sendTo` query parameter, if specified.
 * 
 * @param authProvider AuthProvider class instance
 * @param options Object containing the `Invoice.Id` and the optional `sendTo` options
 * @returns Object containing the `Invoice`
 */
export async function send(
    authProvider: AuthProvider,
    options: { id: string; sendTo?: string }
) {
    const response = await callApi<{ Invoice: Invoice }>(authProvider, {
        path: ["invoice", options.id, "send"],
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
        data: response.data.Invoice
    }
}
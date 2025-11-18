import { defaultRead, defaultQuery, defaultRemove, defaultCreate, defaultUpdate } from "./default-apis";
import type { Bill } from "./types/bill";
import type { PickRequired } from "./types/helpers";

export const read = defaultRead("Bill");
export const query = defaultQuery("Bill");
export const remove = defaultRemove("Bill");
export const create = defaultCreate<PickRequired<Bill, "VendorRef" | "Line">, "Bill">("Bill");
export const update = defaultUpdate<PickRequired<Bill, "VendorRef"| "Line" | "Id" | "SyncToken">, "Bill">("Bill");

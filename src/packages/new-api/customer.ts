import { defaultRead, defaultQuery, defaultCreate, defaultUpdate } from "./default-apis";
import type { Customer } from "./types/customer";
import type { PickRequired } from "./types/helpers";

export const query = defaultQuery("Customer");
export const read = defaultRead("Customer");
export const create = defaultCreate<Partial<Customer>, "Customer">("Customer");
export const update = defaultUpdate<PickRequired<Customer, "Id" | "SyncToken">, "Customer">("Customer")

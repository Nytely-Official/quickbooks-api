import { defaultRead, defaultQuery, defaultCreate, defaultUpdate } from "./default-apis";
import { PickRequired } from "./types/helpers";
import Vendor from "./types/vendor";

export const create = defaultCreate<Partial<Vendor>, "Vendor">("Vendor");
export const query = defaultQuery("Vendor");
export const read = defaultRead("Vendor");
export const update = defaultUpdate<PickRequired<Vendor, "Id" | "SyncToken">, "Vendor">("Vendor");

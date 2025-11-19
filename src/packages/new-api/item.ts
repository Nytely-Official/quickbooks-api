import { defaultRead, defaultQuery, defaultCreate, defaultUpdate } from "./default-apis";
import type { Item } from "./types/item";
import type { PickRequired } from "./types/helpers";

export const read = defaultRead("Item");
export const query = defaultQuery("Item");
export const create = defaultCreate<PickRequired<Item, "Name">, "Item">("Item");
export const update = defaultUpdate<PickRequired<Item, "Name" | "ItemCategoryType" | "Id" | "SyncToken">, "Item">("Item");

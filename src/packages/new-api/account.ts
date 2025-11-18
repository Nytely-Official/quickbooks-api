import { defaultRead, defaultQuery, defaultCreate, defaultUpdate } from "./default-apis";
import type { Account } from "./types/account";
import { PickRequired } from "./types/helpers";

export const query = defaultQuery("Account");
export const read = defaultRead("Account");
export const create = defaultCreate<PickRequired<Account, "Name">, "Account">("Account");
export const update = defaultUpdate<PickRequired<Account, "Id" | "SyncToken" | "Name">, "Account">("Account");

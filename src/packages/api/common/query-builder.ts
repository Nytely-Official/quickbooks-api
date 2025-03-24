import { DeepKeys, DeepKeysType } from "../../../app";

type QueryFilter = {
    key: string;
    value: string;
}

type OrderBy = {
    key: string;
    direction: "asc" | "desc";
}

type Predicate = "eq" | "gt" | "gte" | "lt" | "lte" | "like" | "startswith" | "endswith" | "contains";

export type QueryParams = {
    remap: Record<string, string> | null;
    filters: QueryFilter[];
    orderBy: OrderBy | null;
    limit: number | null;
}

const filterBuilder = (operator: Predicate, value: string) => {
    let valueFix = `'${value}'`
    if (value === 'true' || value === 'false') {
        valueFix = value
    }

    switch (operator) {
        case "eq":
            return `= ${valueFix}`;
        case "gt":
            return `> ${valueFix}`;
        case "gte":
            return `>= ${valueFix}`;
        case "lt":
            return `< ${valueFix}`;
        case "lte":
            return `<= ${valueFix}`;
        case "like":
            return `like ${valueFix}`;
        case "startswith":
            return `like ${valueFix}%`;
        case "endswith":
            return `like %${valueFix}`;
        case "contains":
            return `like %${valueFix}%`;
        default:
            throw new Error(`Invalid predicate: ${operator}`);
    }
}

export class QueryBuilder<Entity, Filters, Sortables> {
    private queryRemap: Record<string, string> | null = null;
    private queryFilters: QueryFilter[] = [];
    private queryLimit: number | null = null;
    private queryOrderBy: OrderBy | null = null;
    private callback: (queryParams: QueryParams) => any;

    constructor(callback: (queryParams: QueryParams) => any) {
        this.callback = callback;
    }

    /**
     * 
     * @param remap
     * @description Remap the data return to custom format
     * @returns 
     */
    public select(remap: Record<string, DeepKeys<Entity>>) {
        this.queryRemap = remap;
        return this;
    }

    /**
     * 
     * @param key 
     * @param value 
     * @param predicate
     * @description Chainable - Can provide multiple where clauses
     * @returns 
     */
    public where<T extends Filters & string>(key: T, predicate: Predicate, value: DeepKeysType<Entity, T>) {
        this.queryFilters.push({ key, value: filterBuilder(predicate, String(value)) });
        return this;
    }

    /**
     * 
     * @param key 
     * @param direction 
     * @returns 
     */
    public orderBy(key: Sortables & string, direction: OrderBy["direction"]) {
        this.queryOrderBy = { key, direction };
        return this;
    }

    /**
     * 
     * @param limit 
     * @returns 
     */
    public limit(limit: number) {
        this.queryLimit = limit;
        return this;
    }

    /**
     * Execute the query and return the results
     * @returns Result of the callback function
     */
    public execute() {
        const queryParams: QueryParams = {
            remap: this.queryRemap,
            filters: this.queryFilters,
            orderBy: this.queryOrderBy,
            limit: this.queryLimit
        };

        return this.callback(queryParams);
    }

    /**
     * Implementation of the PromiseLike interface
     * Makes the QueryBuilder thenable
     * @param onFulfilled Callback to execute when the query completes
     */
    then<TResult1 = any, TResult2 = never>(
        onFulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ): PromiseLike<TResult1 | TResult2> {
        const queryParams: QueryParams = {
            remap: this.queryRemap,
            filters: this.queryFilters,
            orderBy: this.queryOrderBy,
            limit: this.queryLimit
        };

        try {
            const result = this.callback(queryParams);

            // If the result is already a Promise
            if (result && typeof result.then === 'function') {
                return result.then(onFulfilled, onRejected);
            }

            // If the result is not a Promise
            return Promise.resolve(result).then(onFulfilled, onRejected);
        } catch (error) {
            return Promise.reject(error).then(onFulfilled, onRejected);
        }
    }
}
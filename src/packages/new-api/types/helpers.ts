export type OptionalKeys<T> = {
    [K in keyof T]?: undefined;
};

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};


/**
 * Makes the specified keys K in T required, and all other keys optional.
 * Only affects top-level keys.
 */
export type PickRequired<
    T, K extends keyof T
> = Prettify<
    Required<Pick<T, K>>
    &
    Partial<Omit<T, K>>
>;

export type Pair<A, B> = [A, B];
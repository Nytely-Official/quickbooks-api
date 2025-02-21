// Setup the Range Type (Used to extract a range of numbers from the Enumerate Type)
export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

// Setup the Enumerate Type (Used to Generate a List of Numbers)
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;

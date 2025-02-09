/**
 * Convert an object to a string of its keys (Same as keyof but can go deeper)
 */
export type DeepKeys<T> = T extends object
	? {
			[K in keyof T]-?: K extends string
				? T[K] extends Date | Array<unknown> | Function
					? K
					: `${K}${DeepKeys<T[K]> extends never ? '' : `.${DeepKeys<T[K]>}`}`
				: never;
	  }[keyof T]
	: never;

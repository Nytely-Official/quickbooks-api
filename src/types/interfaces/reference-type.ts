// Reference Type Interface
export interface ReferenceType {
	/**
	 * Reference ID (required)
	 * @description ID of referenced object from QuickBooks company file
	 */
	value: string;

	/**
	 * Display name of referenced object (optional)
	 * @description Derived from object's common name (e.g. Customer.DisplayName)
	 */
	name?: string;
}

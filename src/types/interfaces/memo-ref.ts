/**
 * MemoRef
 *
 * @description User-entered message to the customer
 */
export interface MemoRef {
	/**
	 * User-entered message to the customer
	 * @description Required field. Maximum 1000 characters.
	 * @maxLength 1000
	 * @example "Thank you for your business!"
	 */
	value: string;
}

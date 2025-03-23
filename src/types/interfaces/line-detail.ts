// Imports
import { ReferenceType } from '../types';

/**
 * Line Detail
 *
 * @description A line detail object
 */
export interface LineDetail {
	/**
	 * Reference to an Item object
	 * @description Query the Item name list resource to determine the appropriate Item object.
	 * - Use `Item.Id` for `ItemRef.value`
	 * - Use `Item.Name` for `ItemRef.name`
	 * - Lines without ItemRef are treated as documentation (Line.Amount is ignored)
	 *
	 * @note For France locales:
	 * 1. Lookup account in category list matching:
	 *    - TransactionLocationType's location
	 *    - Line item's TaxCodeRef VAT
	 * 2. If mismatch, use account matching transaction location and VAT
	 * 3. If no match found, create new account with:
	 *    - Transaction location
	 *    - VAT code
	 *    - Other attributes from default account
	 */
	ItemRef?: ReferenceType;
}

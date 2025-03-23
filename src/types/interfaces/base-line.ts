/**
 * Base Line
 *
 * @description A base line item in a sales transaction
 */
export interface BaseLine {
	/**
	 * System-defined identifier for the line item
	 * @readonly
	 * @description
	 * - Required for updates
	 * - Usage in requests:
	 *   - ID > 0 and exists: Update operation
	 *   - No ID/ID ≤ 0/ID > 0 but doesn't exist: Create operation
	 * - Available in all objects using lines that support update operations
	 */
	Id: string;

	/**
	 * Line detail type
	 */
	DetailType: 'SalesItemLineDetail' | 'GroupLineDetail' | 'DescriptionOnly' | 'DiscountLineDetail' | 'SubTotalLineDetail';

	/**
	 * Line item description (Max 4000 characters)
	 */
	Description?: string;

	/**
	 * Line position in transaction (Positive integer)
	 */
	LineNum?: number;
}

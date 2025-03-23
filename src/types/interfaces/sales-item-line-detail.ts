// Imports
import { MarkupInfo, ReferenceType } from '../types';

/**
 * Sales Item Line Detail
 *
 * @description The detail of a sales item line
 */
export interface SalesItemLineDetail {
	/**
	 * The total amount of the line item including tax
	 * @description Available when endpoint is evoked with minorversion=1
	 */
	TaxInclusiveAmt?: number;

	/**
	 * The discount amount applied to this line
	 * @description If both DiscountAmt and DiscountRate are supplied, DiscountRate takes precedence
	 */
	DiscountAmt?: number;

	/**
	 * Reference to an Item object
	 * @description Use Item.Id and Item.Name from Item object
	 * - Set to SHIPPING_ITEM_ID for shipping charges (when AllowShipping=true)
	 * - Set to GRATUITY_ITEM_ID for gratuity (when AllowGratuity=true)
	 * - Required for non-documentation lines (ignores Amount if missing)
	 * - For France locales: Matches transaction location and VAT
	 */
	ItemRef?: ReferenceType;

	/**
	 * Reference to the Class for the line item
	 * @description Requires ClassTrackingPerLine=true
	 */
	ClassRef?: ReferenceType;

	/**
	 * Reference to the TaxCode for this item
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * Markup information for billable expenses
	 */
	MarkupInfo?: MarkupInfo;

	/**
	 * Reference to reimbursable charge account
	 * @description Requires Linked ReimburseCharge transaction
	 */
	ItemAccountRef?: ReferenceType;

	/**
	 * Date when the service is performed
	 */
	ServiceDate?: Date;

	/**
	 * The discount rate applied to this line
	 * @description Takes precedence over DiscountAmt if both provided
	 */
	DiscountRate?: number;

	/**
	 * Number of items for the line
	 * @description Can override item's default price
	 */
	Qty?: number;

	/**
	 * Unit price of the item
	 * @description Can override item's default price
	 * - Also used for discount/tax rates (0.4 = 40%)
	 */
	UnitPrice?: number;

	/**
	 * Tax Classification reference (system-defined)
	 * @description For automated sales tax companies
	 */
	TaxClassificationRef?: ReferenceType;
}

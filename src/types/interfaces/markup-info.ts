// Imports
import { ReferenceType } from '../interfaces/reference-type';

/**
 * Markup Info
 *
 * @description The markup info for a sales item line
 */
export interface MarkupInfo {
	/**
	 * Reference to a PriceLevel for the markup
	 * @description Support for this element will be available in the coming months
	 */
	PriceLevelRef?: ReferenceType;

	/**
	 * Markup amount expressed as a percent of charges already entered in the current transaction
	 * @example To enter a rate of 10% use 10.0, not 0.01
	 */
	Percent?: number;

	/**
	 * The account associated with the markup
	 * @description Available with invoice objects, only, and when linktxn specified a ReimburseCharge
	 * @readonly
	 */
	MarkUpIncomeAccountRef?: ReferenceType;
}

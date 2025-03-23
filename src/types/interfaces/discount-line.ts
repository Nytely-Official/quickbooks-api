// Imports
import { BaseLine, DiscountLineDetail } from '../types';

/**
 * Discount Line
 *
 * @description A line item in a sales transaction
 */
export interface DiscountLine extends BaseLine {
	/**
	 * Line detail type
	 */
	DetailType: 'DiscountLineDetail';

	/**
	 * Discount line details
	 */
	DiscountLineDetail: DiscountLineDetail;

	/**
	 * Line item amount (Max 15 digits in 10.5 format)
	 * @description For Invoice objects in global locales: Remove TxnTaxDetail element when updating Amount in requests
	 */
	Amount: number;
}

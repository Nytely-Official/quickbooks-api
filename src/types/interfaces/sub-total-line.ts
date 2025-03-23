// Imports
import { BaseLine, LineDetail } from '../types';

/**
 * Sub Total Line
 *
 * @description A line item in a sales transaction
 */
export interface SubTotalLine extends BaseLine {
	/**
	 * Line detail type
	 */
	DetailType: 'SubTotalLineDetail';

	/**
	 * Sub total line details
	 */
	SubTotalLineDetail: LineDetail;

	/**
	 * Line item amount (Max 15 digits in 10.5 format)
	 * @description For Invoice objects in global locales: Remove TxnTaxDetail element when updating Amount in requests
	 */
	Amount: number;
}

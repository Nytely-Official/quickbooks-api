// Imports
import { BaseLine, SalesItemLineDetail } from '../types';

/**
 * Sales Item Line
 *
 * @description A line item in a sales transaction
 */
export interface SalesItemLine extends BaseLine {
	/**
	 * Line detail type
	 */
	DetailType: 'SalesItemLineDetail';

	/**
	 * Sales item line details
	 */
	SalesItemLineDetail: SalesItemLineDetail;

	/**
	 * Line item amount (Max 15 digits in 10.5 format)
	 * @description For Invoice objects in global locales: Remove TxnTaxDetail element when updating Amount in requests
	 */
	Amount: number;
}

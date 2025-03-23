// Imports
import { BaseLine, DescriptionLineDetail } from '../types';

/**
 * Description Only Line
 *
 * @description A line item in a sales transaction
 */
export interface DescriptionOnlyLine extends BaseLine {
	/**
	 * Line detail type
	 */
	DetailType: 'DescriptionOnly';

	/**
	 * Description line details
	 */
	DescriptionLineDetail: DescriptionLineDetail;

	/**
	 * Line item amount (Max 15 digits in 10.5 format)
	 * @description For Invoice objects in global locales: Remove TxnTaxDetail element when updating Amount in requests
	 */
	Amount: number;
}

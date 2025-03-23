// Imports
import { TaxLineDetail } from '../types';

/**
 * TaxLine
 *
 * @description The tax line for the transaction
 */
export interface TaxLine {
	/**
	 * Required - Must be set to TaxLineDetail
	 */
	DetailType: 'TaxLineDetail';

	/**
	 * Required - Tax line details
	 * @see TaxLineDetail for child attributes
	 */
	TaxLineDetail: TaxLineDetail;

	/**
	 * Optional tax amount (negative values indicate tax credits)
	 * @format decimal
	 * @max 15 digits with 10.5 format (15 total digits, 5 decimal places)
	 */
	Amount?: number;
}

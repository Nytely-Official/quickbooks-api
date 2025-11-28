// Internal Imports
import { IntuitErrorItem, IntuitFaultType } from '../types';

/**
 * The Intuit Error Response Interface
 */
export interface IntuitErrorData {
	/**
	 * The status code of the response
	 */
	statusCode: number;

	/**
	 * The Array of Error Objects returned from the Intuit API
	 */
	intuitError: Array<IntuitErrorItem>;

	/**
	 * The type of the error
	 */
	type: IntuitFaultType;

	/**
	 * The Transaction ID of the Request from Intuit
	 */
	intuitTID: string;
}

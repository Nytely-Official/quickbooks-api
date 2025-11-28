// Internal Imports
import { OldIntuitErrorItem, IntuitErrorItem, IntuitFaultType } from '../types';

/**
 * The raw Intuit error response data from api calls
 */
export interface IntuitErrorResponse {
	/**
	 * The Fault Object returned from the Intuit API
	 * this version is the old version, utilizing uppercase for properties instead of lowercase
	 * Some API calls will return this version, so we need to support it
	 */
	Fault?: {
		/**
		 * The Array of Error Objects returned from the Intuit API
		 */
		Error: Array<OldIntuitErrorItem>;

		/**
		 * The type of the error
		 */
		type: IntuitFaultType;
	};

	/**
	 * The Fault Object returned from the Intuit API
	 * this version is the new version, utilizing lowercase for properties instead of uppercase
	 */
	fault?: {
		/**
		 * The Array of Error Objects returned from the Intuit API
		 */
		error: Array<IntuitErrorItem>;

		/**
		 * The type of the error
		 */
		type: IntuitFaultType;
	};

	/**
	 * The time of the request
	 */
	time: Date;
}

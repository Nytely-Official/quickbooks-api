// Internal Imports
import { IntuitFaultCodes } from '../types';

/**
 * The Array of Error Objects returned from the Intuit API
 * this version is the new version, utilizing lowercase for properties instead of uppercase
 */
export interface IntuitErrorItem {
	/**
	 * The message of the error
	 */
	message: string;

	/**
	 * The detail of the error
	 */
	detail: string;

	/**
	 * The code of the error
	 */
	code: IntuitFaultCodes;
}

/**
 * The Array of Error Objects returned from the Intuit API
 * this version is the old version, utlizing uppercase for properties instead of lowercase
 */
export type OldIntuitErrorItem = {
	/**
	 * The message of the error
	 */
	Message: string;

	/**
	 * The detail of the error
	 */
	Detail: string;

	/**
	 * The code of the error
	 */
	code: IntuitFaultCodes;
};

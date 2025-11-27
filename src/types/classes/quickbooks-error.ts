// Internal Imports
import { IntuitErrorData } from '../types';

/**
 * The Quickbooks Error Class
 */
export class QuickbooksError extends Error {
	/**
	 * The Intuit Error Details
	 */
	public readonly details: IntuitErrorData;

	/**
	 * Initialize the Quickbooks Error
	 * @param message The error message
	 * @param details The Intuit error details
	 */
	constructor(message: string, details: IntuitErrorData) {
		// Initialize the Error
		super(message);

		// Set the Intuit Error Details
		this.details = details;
	}
}

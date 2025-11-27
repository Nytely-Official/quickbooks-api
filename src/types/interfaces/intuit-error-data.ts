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
	intuitError: Array<{
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
		code: string;
	}>;

	/**
	 * The Transaction ID of the Request from Intuit
	 */
	intuitTID: string;
}

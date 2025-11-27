/**
 * The raw Intuit error response data from api calls
 */
export interface IntuitErrorResponse {
	/**
	 * The Fault Object returned from the Intuit API
	 */
	Fault: {
		/**
		 * The Array of Error Objects returned from the Intuit API
		 */
		Error: Array<{
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
			code: string;
		}>;

		/**
		 * The type of the error
		 */
		type: string;
	};

	/**
	 * The time of the request
	 */
	time: string;
}

// Imports
import { mock } from 'bun:test';

/**
 * Mocks the fetch function
 * @param response - The response to mock
 * @param ok - Whether the response is ok
 * @returns The mocked fetch function
 */
export function mockFetch(responseData: BodyInit, responseStatus = 200) {
	// Setup the Mock
	return mock<typeof fetch>(async (_input: URL | RequestInfo, options: undefined | RequestInit) => {
		// Check if the options are not valid
		if (!options) throw new Error('Invalid options');

		// Setup the Response Body
		const responseBody: BodyInit = responseData;

		// Setup the New Response
		const response = new Response(responseBody, { status: responseStatus, headers: { 'Content-Type': 'application/json' } });

		// Return the Response
		return response;
	});
}

// Export the Mock Data
export { mockAuthResponseData } from './__mocks__/auth-response-data';
export { mockTokenData } from './__mocks__/token-data';
export { mockInvoiceData } from './__mocks__/invoice-data';
export { mockCustomerData } from './__mocks__/customer-data';
export { mockEstimateData } from './__mocks__/estimate-data';
export { mockPaymentData } from './__mocks__/payment-data';

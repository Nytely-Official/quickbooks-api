// Imports
import { type Payment, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { PaymentAPI } from '../payment-api';

/**
 * Get All Payments
 * @param this - The Payment API
 * @returns The Payments
 */
export async function getAllPayments(this: PaymentAPI, options: SearchOptions<Payment> = {}): Promise<SearchResponse<Payment>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Payments
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const payments = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Payment> = {
		results: payments,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Payments
	return searchResponse;
}

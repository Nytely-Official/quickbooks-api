// Import the Query Builder
import { PaymentAPI } from '../payment-api';
import type { PaymentQueryBuilder } from '../payment-query-builder';
import type { Payment, SearchResponse } from '../../../../types/types';

/**
 * Raw Payment Query
 * @param this - The Payment API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawPaymentQuery(this: PaymentAPI, queryBuilder: PaymentQueryBuilder): Promise<SearchResponse<Payment>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
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

// Import the Query Builder
import { CustomerAPI } from '../customer-api';
import type { CustomerQueryBuilder } from '../customer-query-builder';
import type { Customer, SearchResponse } from '../../../../types/types';

/**
 * Raw Customer Query
 * @param this - The Customer API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawCustomerQuery(this: CustomerAPI, queryBuilder: CustomerQueryBuilder): Promise<SearchResponse<Customer>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const customers = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Customer> = {
		results: customers,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Customers
	return searchResponse;
}

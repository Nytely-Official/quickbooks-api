// Imports
import { type Customer, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Get All Customers
 * @param this - The Customer API
 * @returns The Customers
 */
export async function getAllCustomers(this: CustomerAPI, options: SearchOptions<Customer> = {}): Promise<SearchResponse<Customer>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Customers
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const customer = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Customer> = {
		results: customer,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Customers
	return searchResponse;
}

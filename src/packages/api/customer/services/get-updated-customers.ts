// Import the Query Builder
import { SearchOptions, SearchResponse, type Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Get Updated Customers
 * @param this - The Customer API
 * @param lastUpdatedDate - The last updated date
 * @returns The Customers
 */
export async function getUpdatedCustomers(
	this: CustomerAPI,
	lastUpdatedDate: Date,
	options: SearchOptions<Customer> = {},
): Promise<SearchResponse<Customer>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Customers
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

// Import the Query Builder
import { SearchOptions, SearchResponse, type Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Get Customers for a Date Range
 * @param this - The Customer API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The Customers
 */
export async function getCustomersForDateRange(
	this: CustomerAPI,
	startDate: Date,
	endDate: Date,
	options: SearchOptions<Customer> = {},
): Promise<SearchResponse<Customer>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

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

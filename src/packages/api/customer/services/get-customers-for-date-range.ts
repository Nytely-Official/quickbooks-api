// Import the Query Builder
import { SearchOptions, SearchResponse, type Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Retrieves customers updated within a specified date range.
 *
 * This asynchronous function constructs a query to filter customers based on their last update timestamps,
 * applies optional search configurations, and retrieves customer data via a GET request. The response is
 * formatted into a structured search response containing the customers and a flag indicating if more pages of
 * results are available.
 *
 * @param startDate - The beginning of the date range for filtering customer updates.
 * @param endDate - The end of the date range for filtering customer updates.
 * @param options - Optional search configuration for additional filtering, pagination, or sorting.
 * @returns A promise that resolves to a search response with the filtered customers and pagination details.
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

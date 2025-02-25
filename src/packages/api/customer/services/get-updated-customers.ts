// Import the Query Builder
import { SearchOptions, SearchResponse, type Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Retrieves updated customer records modified after the specified cutoff date.
 *
 * This function constructs a query to filter customers updated after the given date, applies
 * any provided search options, builds the request URL, and executes a GET request to fetch the data.
 * The API response is then formatted into a search response object containing the list of customers
 * and a flag indicating whether additional pages of results are available.
 *
 * @param lastUpdatedDate - The cutoff date; only customers updated after this date are returned.
 * @param options - Optional search parameters to refine the query.
 * @returns A promise that resolves to a search response with the updated customer records and pagination information.
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

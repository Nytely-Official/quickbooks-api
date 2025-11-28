// Imports
import { plainToClass } from 'class-transformer';
import { Customer, type CustomerOptions, type SearchResponse } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Retrieves all customers filtered by the provided search options.
 *
 * This function initializes a query builder, applies the specified search options, constructs the API request URL, and performs a GET request to fetch customer data. It then formats the response and returns a search response object containing the customer results and a flag indicating whether more pages are available.
 *
 * @param options - Optional search criteria and configurations for retrieving customers.
 * @returns A promise that resolves to a search response with customer data and pagination details.
 */
export async function getAllCustomers(this: CustomerAPI, options: CustomerOptions = {}): Promise<SearchResponse<Customer>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Customers
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const customers = await this.formatResponse(responseData);

	// Map the Customers to Classes
	const mappedCustomers = customers.map((customer) => plainToClass(Customer, customer));

	// Setup the Search Response
	const searchResponse: SearchResponse<Customer> = {
		results: mappedCustomers,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Customers
	return searchResponse;
}

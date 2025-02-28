// Import the Query Builder
import type { Customer, CustomerOptions } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Retrieves a customer by their ID from the Customer API.
 *
 * This asynchronous function constructs a query using the customer ID and optional search
 * configurations to build the request URL. It sends a GET request, formats the response, and
 * returns the first matching customer. If no customer is found, it throws an error.
 *
 * @param id - The unique identifier of the customer.
 * @param options - Optional search configurations to refine the query.
 *
 * @returns A Promise that resolves to the retrieved customer.
 *
 * @throws {Error} If no customer is found for the provided ID.
 */
export async function getCustomerById(this: CustomerAPI, id: string, options: CustomerOptions = {}): Promise<Customer> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Customer
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Customer
	if (!response) throw new Error('Customer not found');

	// Format the Response
	const customers = this.formatResponse(response);

	// Return the Customer
	return customers[0];
}

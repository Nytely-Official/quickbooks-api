// Import the Query Builder
import { type CustomerOptions, Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';
import { plainToClass } from 'class-transformer';

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
export async function getCustomerById(this: CustomerAPI, id: string, options: CustomerOptions = {}): Promise<Customer | null> {
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
	if (!response) return null;

	// Format the Response
	const customers = this.formatResponse(response);

	// Convert the Customer to a Class
	const customer = customers[0] ? plainToClass(Customer, customers[0]) : null;

	// Check if the Customer is valid and set the API Client
	if (customer) customer.setApiClient(this.apiClient);

	// Return the Customer
	return customer;
}

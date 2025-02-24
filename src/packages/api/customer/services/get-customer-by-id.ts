// Import the Query Builder
import { SearchOptions, type Customer } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';

/**
 * Get Customer by ID
 * @param this - The Customer API
 * @param id - The ID of the customer
 * @returns The Customer
 */
export async function getCustomerById(this: CustomerAPI, id: string, options: SearchOptions<Customer> = {}): Promise<Customer> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

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

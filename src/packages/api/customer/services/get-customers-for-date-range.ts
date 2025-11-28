// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { Customer, QuickbooksError, type CustomerOptions, type SearchResponse } from '../../../../types/types';
import { CustomerAPI } from '../customer-api';
import { ApiClient } from '../../api-client';

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
	options: CustomerOptions = {},
): Promise<SearchResponse<Customer>> {
	// Ensure the Start Date is Before the End Date
	if (startDate > endDate) throw new QuickbooksError('Start date must be before end date', await ApiClient.getIntuitErrorDetails(null));

	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

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

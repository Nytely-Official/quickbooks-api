// Import the Query Builder
import type { Payment, PaymentOptions, SearchResponse } from '../../../../types/types';
import { PaymentAPI } from '../payment-api';

/**
 * Get Payments for a Date Range
 * @param this - The Payment API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The Payments
 */
export async function getPaymentsForDateRange(
	this: PaymentAPI,
	startDate: Date,
	endDate: Date,
	options: PaymentOptions = {},
): Promise<SearchResponse<Payment>> {
	// Ensure the Start Date is Before the End Date
	if (startDate > endDate) throw new Error('Start date must be before end date');

	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Payments
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const payments = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Payment> = {
		results: payments,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Payments
	return searchResponse;
}

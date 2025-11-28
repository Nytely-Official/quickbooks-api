// Import the Query Builder
import type { Payment, PaymentOptions, SearchResponse } from '../../../../types/types';
import { PaymentAPI } from '../payment-api';

/**
 * Get Payments by Due Date
 * @param this - The Payment API
 * @param dueDate - The due date to filter by
 * @returns Filtered Payments
 */
export async function getPaymentsByDueDate(
	this: PaymentAPI,
	dueDate: Date,
	options: PaymentOptions = {},
): Promise<SearchResponse<Payment>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Due Date Filter
	queryBuilder.whereDueDate(dueDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL with due date filter
	const url = queryBuilder.build();

	// Get the Payments
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const payments = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Payment> = {
		results: payments,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Payments
	return searchResponse;
}

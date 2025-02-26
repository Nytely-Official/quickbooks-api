// Import the Query Builder
import { SearchOptions, SearchResponse, type Payment } from '../../../../types/types';
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
	options: SearchOptions<Payment> = {},
): Promise<SearchResponse<Payment>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Due Date Filter
	queryBuilder.whereDueDate(dueDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL with due date filter
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

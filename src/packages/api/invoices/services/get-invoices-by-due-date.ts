// Import the Query Builder
import type { Invoice, InvoiceOptions, SearchResponse } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoices by Due Date
 * @param this - The Invoice API
 * @param dueDate - The due date to filter by
 * @returns Filtered Invoices
 */
export async function getInvoicesByDueDate(
	this: InvoiceAPI,
	dueDate: Date,
	options: InvoiceOptions = {},
): Promise<SearchResponse<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Due Date Filter
	queryBuilder.whereDueDate(dueDate);

	// Filter by Status (if provided)
	if (options.status) queryBuilder.whereStatus(options.status);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL with due date filter
	const url = queryBuilder.build();

	// Get the Invoices
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Invoice> = {
		results: invoices,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Invoices
	return searchResponse;
}

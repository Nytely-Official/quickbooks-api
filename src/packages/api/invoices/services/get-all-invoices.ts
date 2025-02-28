// Imports
import type { Invoice, SearchResponse, InvoiceOptions } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get All Invoices
 * @param this - The Invoice API
 * @returns The Invoices
 */
export async function getAllInvoices(this: InvoiceAPI, options: InvoiceOptions = {}): Promise<SearchResponse<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Filter by Status (if provided)
	if (options.status) queryBuilder.whereStatus(options.status);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
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

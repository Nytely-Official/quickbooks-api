// Imports
import { type Invoice, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get All Invoices
 * @param this - The Invoice API
 * @returns The Invoices
 */
export async function getAllInvoices(this: InvoiceAPI, options: SearchOptions<Invoice> = {}): Promise<SearchResponse<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

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

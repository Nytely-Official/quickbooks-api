// Import the Query Builder
import { InvoiceAPI } from '../invoice-api';
import type { InvoiceQueryBuilder } from '../invoice-query-builder';
import type { Invoice, SearchResponse } from '../../../../types/types';

/**
 * Raw Invoice Query
 * @param this - The Invoice API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawInvoiceQuery(this: InvoiceAPI, queryBuilder: InvoiceQueryBuilder): Promise<SearchResponse<Invoice>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
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

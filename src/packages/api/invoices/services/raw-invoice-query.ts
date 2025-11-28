// Import the Query Builder
import { InvoiceAPI } from '../invoice-api';
import type { InvoiceQueryBuilder } from '../invoice-query-builder';
import { Invoice, type SearchResponse } from '../../../../types/types';
import { plainToClass } from 'class-transformer';

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
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = await this.formatResponse(responseData);

	// Map the Invoices to Classes
	const mappedInvoices = invoices.map((invoice) => plainToClass(Invoice, invoice));

	// Setup the Search Response
	const searchResponse: SearchResponse<Invoice> = {
		results: mappedInvoices,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Invoices
	return searchResponse;
}

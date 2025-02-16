// Import the Query Builder
import { InvoiceAPI } from '../invoice-api';
import type { InvoiceQueryBuilder } from '../invoice-query-builder';
import type { Invoice } from '../../../../types/types';

/**
 * Raw Invoice Query
 * @param this - The Invoice API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawInvoiceQuery(this: InvoiceAPI, queryBuilder: InvoiceQueryBuilder): Promise<Array<Invoice>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoices
	return invoices;
}

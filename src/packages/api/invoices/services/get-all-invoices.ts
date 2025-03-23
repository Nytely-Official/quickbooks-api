// Imports
import { Invoice, type SearchResponse, type InvoiceOptions } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';
import { plainToClass } from 'class-transformer';
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

	// Map the Invoices to Classes
	const mappedInvoices = invoices.map((invoice) => plainToClass(Invoice, invoice));

	// Setup the Search Response
	const searchResponse: SearchResponse<Invoice> = {
		results: mappedInvoices,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Invoices
	return searchResponse;
}

// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { Invoice, type InvoiceOptions, type SearchResponse } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Updated Invoices
 * @param this - The Invoice API
 * @param lastUpdatedDate - The last updated date
 * @returns The Invoices
 */
export async function getUpdatedInvoices(
	this: InvoiceAPI,
	lastUpdatedDate: Date,
	options: InvoiceOptions = {},
): Promise<SearchResponse<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Filter by Status (if provided)
	if (options.status) queryBuilder.whereStatus(options.status);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Invoices
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

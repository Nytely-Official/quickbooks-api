// Import the Query Builder
import { SearchOptions, SearchResponse, type Invoice } from '../../../../types/types';
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
	options: SearchOptions<Invoice> = {},
): Promise<SearchResponse<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

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

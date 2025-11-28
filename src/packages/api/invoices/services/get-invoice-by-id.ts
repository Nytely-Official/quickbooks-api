// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { Invoice, InvoiceOptions } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoice by ID
 * @param this - The Invoice API
 * @param id - The ID of the invoice
 * @returns The Invoice
 */
export async function getInvoiceById(
	this: InvoiceAPI,
	id: string,
	options: InvoiceOptions = {},
): Promise<{ invoice: Invoice | null; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Filter by Status (if provided)
	if (options.status) queryBuilder.whereStatus(options.status);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Invoice
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Invoice
	if (!responseData) return { invoice: null, intuitTID };

	// Format the Response
	const invoices = await this.formatResponse(responseData);

	// Convert the Invoice to a Class
	const invoice = invoices[0] ? plainToClass(Invoice, invoices[0]) : null;

	// Check if the Invoice is valid and set the API Client
	if (invoice) invoice.setApiClient(this.apiClient);

	// Return the Invoice with Intuit TID
	return {
		invoice,
		intuitTID,
	};
}

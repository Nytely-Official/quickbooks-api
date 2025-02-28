// Import the Query Builder
import type { Invoice, InvoiceOptions } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoice by ID
 * @param this - The Invoice API
 * @param id - The ID of the invoice
 * @returns The Invoice
 */
export async function getInvoiceById(this: InvoiceAPI, id: string, options: InvoiceOptions = {}): Promise<Invoice> {
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
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Invoice
	if (!response) throw new Error('Invoice not found');

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoice
	return invoices[0];
}

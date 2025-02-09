// Import the Query Builder
import { type Invoice } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoice by ID
 * @param this - The Invoice API
 * @param id - The ID of the invoice
 * @returns The Invoice
 */
export async function getInvoiceById(this: InvoiceAPI, id: string): Promise<Invoice> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the URL
	const url = queryBuilder.whereId(id).build();

	// Get the Invoice
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Invoice
	if (!response) throw new Error('Invoice not found');

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoice
	return invoices[0];
}

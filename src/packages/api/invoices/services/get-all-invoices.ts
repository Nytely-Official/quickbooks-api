// Import the Query Builder
import { type Invoice } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get All Invoices
 * @param this - The Invoice API
 * @returns The Invoices
 */
export async function getAllInvoices(this: InvoiceAPI): Promise<Array<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Invoices
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoices
	return invoices;
}

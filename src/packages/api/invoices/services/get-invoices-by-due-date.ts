// Import the Query Builder
import { type Invoice } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoices by Due Date
 * @param this - The Invoice API
 * @param dueDate - The due date to filter by
 * @returns Filtered Invoices
 */
export async function getInvoicesByDueDate(this: InvoiceAPI, dueDate: Date): Promise<Array<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the URL with due date filter
	const url = queryBuilder.whereDueDate(dueDate).build();

	// Get the Invoices
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoices
	return invoices;
}

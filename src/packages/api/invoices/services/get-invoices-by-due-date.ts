// Import the Query Builder
import { SearchOptions, type Invoice } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Invoices by Due Date
 * @param this - The Invoice API
 * @param dueDate - The due date to filter by
 * @returns Filtered Invoices
 */
export async function getInvoicesByDueDate(this: InvoiceAPI, dueDate: Date, options: SearchOptions<Invoice> = {}): Promise<Array<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Due Date Filter
	queryBuilder.whereDueDate(dueDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL with due date filter
	const url = queryBuilder.build();

	// Get the Invoices
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoices
	return invoices;
}

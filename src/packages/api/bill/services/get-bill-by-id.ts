// Import the Query Builder
import { QuickbooksError, type Bill } from '../../../../types/types';
import { ApiClient } from '../../api-client';
import { BillAPI } from '../bill-api';

/**
 * Get Bill by ID
 * @param this - The Bill API
 * @param id - The ID of the bill
 * @returns The Bill
 */
export async function getBillById(this: BillAPI, id: string): Promise<Bill> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Bill
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Bill
	if (!response) throw new QuickbooksError('Bill not found', await ApiClient.getIntuitErrorDetails(null));

	// Format the Response
	const bills = await this.formatResponse(response);

	// Return the Bill
	return bills[0];
}

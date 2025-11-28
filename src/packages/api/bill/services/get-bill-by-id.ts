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
export async function getBillById(this: BillAPI, id: string): Promise<{ bill: Bill; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Bill
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Bill
	if (!responseData) throw new QuickbooksError('Bill not found', await ApiClient.getIntuitErrorDetails(null));

	// Format the Response
	const bills = await this.formatResponse(responseData);

	// Return the Bill with Intuit TID
	return {
		bill: bills[0],
		intuitTID,
	};
}

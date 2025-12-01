// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { Bill } from '../../../../types/types';
import { BillAPI } from '../bill-api';

/**
 * Get Bill by ID
 * @param this - The Bill API
 * @param id - The ID of the bill
 * @returns The Bill
 */
export async function getBillById(this: BillAPI, id: string): Promise<{ bill: Bill | null; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Bill
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Bill
	if (!responseData) return { bill: null, intuitTID };

	// Format the Response
	const bills = await this.formatResponse(responseData);

	// Convert the Bill to a Class
	const bill = bills[0] ? plainToClass(Bill, bills[0]) : null;

	// Check if the Bill is valid and set the API Client
	if (bill) bill.setApiClient(this.apiClient);

	// Return the Bill with Intuit TID
	return {
		bill,
		intuitTID,
	};
}

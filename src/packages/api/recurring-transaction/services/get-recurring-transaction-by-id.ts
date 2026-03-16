// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { RecurringTransaction } from '../../../../types/types';
import { RecurringTransactionAPI } from '../recurring-transaction-api';

/**
 * Get RecurringTransaction by ID
 * @param this - The RecurringTransaction API
 * @param id - The ID of the recurring transaction
 * @returns The RecurringTransaction
 */
export async function getRecurringTransactionById(
	this: RecurringTransactionAPI,
	id: string,
): Promise<{ recurringTransaction: RecurringTransaction | null; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the RecurringTransaction
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find a RecurringTransaction
	if (!responseData) return { recurringTransaction: null, intuitTID };

	// Format the Response
	const recurringTransactions = await this.formatResponse(responseData);

	// Convert the RecurringTransaction to a Class
	const recurringTransaction = recurringTransactions[0] ? plainToClass(RecurringTransaction, recurringTransactions[0]) : null;

	// Check if the RecurringTransaction is valid and set the API Client
	if (recurringTransaction) recurringTransaction.setApiClient(this.apiClient);

	// Return the RecurringTransaction with Intuit TID
	return {
		recurringTransaction,
		intuitTID,
	};
}

import type { RecurringTransaction, RecurringTransactionOptions, SearchResponse } from '../../../../types/types';
import { RecurringTransactionAPI } from '../recurring-transaction-api';

/**
 * Get All RecurringTransactions
 * @param this - The RecurringTransaction API
 * @param options - The options
 * @returns The RecurringTransactions
 */
export async function getAllRecurringTransactions(
	this: RecurringTransactionAPI,
	options: RecurringTransactionOptions = {},
): Promise<SearchResponse<RecurringTransaction>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Build the URL
	const url = queryBuilder.build();

	// Get the RecurringTransactions
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const recurringTransactions = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<RecurringTransaction> = {
		results: recurringTransactions,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Search Response
	return searchResponse;
}

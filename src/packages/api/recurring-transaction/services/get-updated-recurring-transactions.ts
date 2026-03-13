// Import the Query Builder
import type { RecurringTransaction, RecurringTransactionOptions, SearchResponse } from '../../../../types/types';
import { RecurringTransactionAPI } from '../recurring-transaction-api';

/**
 * Get Updated RecurringTransactions
 * @param this - The RecurringTransaction API
 * @param lastUpdatedDate - The last updated date
 * @returns The RecurringTransactions
 */
export async function getUpdatedRecurringTransactions(
	this: RecurringTransactionAPI,
	lastUpdatedDate: Date,
	options: RecurringTransactionOptions = {},
): Promise<SearchResponse<RecurringTransaction>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
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

	// Return the RecurringTransactions
	return searchResponse;
}

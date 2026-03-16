// Import the Query Builder
import { RecurringTransactionAPI } from '../recurring-transaction-api';
import type { RecurringTransactionQueryBuilder } from '../recurring-transaction-query-builder';
import type { RecurringTransaction, SearchResponse } from '../../../../types/types';

/**
 * Raw RecurringTransaction Query
 * @param this - The RecurringTransaction API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawRecurringTransactionQuery(
	this: RecurringTransactionAPI,
	queryBuilder: RecurringTransactionQueryBuilder,
): Promise<SearchResponse<RecurringTransaction>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
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
